import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CountryService,
  Employer,
  Industry,
  IndustryService,
  LogService,
  WebsiteValidator,
} from '@bau/core';
import { ToastService } from '@bau/toast';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Country } from 'libs/core/src/models/country';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'bau-new-employers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './new-employers.component.html',
  styleUrl: './new-employers.component.scss',
})
export class NewEmployersComponent implements OnInit {
  selectedCountryId = 64;
  selectedIndustrie!: number;
  employerFormGroup!: FormGroup;
  employer!: Employer;

  forbiddenNames = ['Bob', 'Alice', 'OtherForbiddenName'];

  private fb = inject(FormBuilder);
  private library = inject(FaIconLibrary);
  private webValidator = inject(WebsiteValidator);
  private logService = inject(LogService);
  private toastService = inject(ToastService);
  private countryService = inject(CountryService);
  private industryService = inject(IndustryService);

  countries$!: Observable<Country[]>;
  industries$!: Observable<Industry[]>;

  constructor() {
    this.getCountries();
    this.getIndustries();
  }

  private getCountries() {
    this.countryService.getCountries().subscribe({
      next: (countries) => {
        this.countries$ = of(countries);
      },
      error: (error) => {
        const message = `Fehler beim Laden der Länderliste: ${error}`;
        this.logService.log(message, 'Error');
      },
      complete: () => {
        const message = 'Das Laden der Länderliste wurde abgeschlossen';
        this.logService.log(message, 'INFO');
      },
    });
  }

  private getIndustries() {
    this.industryService.getIndustries().subscribe({
      next: (industries) => {
        this.industries$ = of(industries);
      },
      error: (error) => {
        const message = `Fehler beim Laden der Branchen: ${error}`;
        this.logService.log(message, 'Error');
      },
      complete: () => {
        const message = 'Das Laden der Branchen wurde abgeschlossen';
        this.logService.log(message, 'INFO');
      },
    });
  }

  ngOnInit(): void {
    this.library.addIcons(faArrowLeft);
    this.setEmployersForm();
  }

  private setEmployersForm() {
    this.employerFormGroup = this.fb.group({
      employerName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
        this.forbiddenNameValidator(this.forbiddenNames),
      ]),
      employerCountry: new FormControl(64, [
        Validators.required,
        Validators.pattern('[a-zA-Z]+'),
      ]),
      employerStreet: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z\\.\\- ]+'),
      ]),
      employerStreetNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      employerLocation: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z-. ]+'),
      ]),
      employerLocationCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      employerEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      employerTelefone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      employerInternet: new FormControl('', [
        Validators.required,
        this.websiteValidator(),
      ]),
      employerIndustry: new FormControl('', Validators.required),
      employeeCount: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  private forbiddenNameValidator(forbiddenNames: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const forbidden = forbiddenNames.some((forbiddenName) =>
        control.value.toLowerCase().includes(forbiddenName.toLowerCase())
      );
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  private websiteValidator(): ValidatorFn {
    return this.webValidator.validate();
  }

  onSubmit(boolean = true): void {
    if (boolean) {
      const message = 'Das Anlegen des Arbeitgebers war erfolgreich';
      // const toast = {
      //   header: 'Erfolg',
      //   body: message,
      //   autohide: true,
      // };

      // this.toastService.show(toast, TOAST_TYPE.INFO);
      this.logService.log(message, 'SUCCESS');
    } else {
      const message = 'Das Anlegen des Arbeitgebers führte zu einem Fehler';
      this.logService.log(message, 'ERROR');
    }
  }
}

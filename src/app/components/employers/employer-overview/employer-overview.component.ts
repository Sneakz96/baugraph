import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  COUNTRIES,
  Employer,
  EmployerService,
  LogService,
  WebsiteValidator,
} from '@bau/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { INDUSTRIES } from '../new-employers/industries';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'bau-employer-overview',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule],
  templateUrl: './employer-overview.component.html',
  styleUrl: './employer-overview.component.scss',
})
export class EmployerOverviewComponent implements OnInit {
  employer!: Employer | undefined;
  employerFormGroup!: FormGroup;
  countries = COUNTRIES;
  industries = INDUSTRIES;
  employers$!: Observable<Employer[]>;

  constructor(
    private library: FaIconLibrary,
    private activeRoute: ActivatedRoute,
    private employerService: EmployerService,
    private fb: FormBuilder,
    private webValidator: WebsiteValidator,
    private logService: LogService
  ) {
    this.library.addIcons(faArrowLeft);
  }

  ngOnInit(): void {
    this.setEmployersForm();
    this.activeRoute.params.subscribe((params) => {
      const employerId = +params['id'];
      this.getEmployer(employerId);
    });
  }

  private getEmployer(employerId: number) {
    this.employerService.getEmployerById(employerId).subscribe({
      next: (employer) => {
        this.employer = employer;
        this.fillEmployerForm();
      },
      error: (error) => {
        const message = `Fehler beim Laden des Arbeitgebers : ${error}`;
        this.logService.log(message, 'Error');
      },
      complete: () => {
        const message = 'Das Laden des Arbeitgebers wurde abgeschlossen';
        this.logService.log(message, 'INFO');
      },
    });
  }

  private fillEmployerForm(): void {
    if (this.employer) {
      this.employerFormGroup.patchValue({
        employerName: this.employer.employerName,
        employerCountry: this.employer?.employerCountryId,
        employerStreet: this.employer.employerStreet,
        employerStreetNumber: this.employer.employerStreetNumber,
        employerLocation: this.employer.employerLocation,
        employerLocationCode: this.employer.employerLocationCode,
        employerEmail: this.employer.employerEmail,
        employerTelefone: this.employer.employerTelefone,
        employerInternet: this.employer.employerInternet,
        employerIndustry: this.employer.employerIndustryId,
        employeeCount: this.employer.employeeCount,
      });
    }
  }

  private setEmployersForm() {
    this.employerFormGroup = this.fb.group({
      employerName: new FormControl('', Validators.required),
      employerCountry: new FormControl('', [
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

  private websiteValidator(): ValidatorFn {
    return this.webValidator.validate();
  }

  save(): void {
    const message = 'Das Speichern der Änderungen wurde abgeschlossen';
    this.logService.log(message, 'INFO');
  }
}

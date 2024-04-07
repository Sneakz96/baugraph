import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {  Country, CountryService, Employer, EmployerService, LogService } from '@bau/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, of } from 'rxjs';
import { NgbdSortableHeaderDirective, SortEvent } from './sort.directive';

@Component({
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    NgbdSortableHeaderDirective,
    NgbPaginationModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [EmployerService, DecimalPipe],

  selector: 'bau-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  employers$: Observable<Employer[]>;
  total$: Observable<number>;
  countries$!: Observable<Country[]>;

  @ViewChildren(NgbdSortableHeaderDirective)
  headers!: QueryList<NgbdSortableHeaderDirective>;

  constructor(
    public employerService: EmployerService,
    private library: FaIconLibrary,
    private router: Router,
    private logService: LogService,
    public countryService: CountryService
  ) {
    this.library.addIcons(faArrowLeft);
    this.total$ = this.employerService.total$;
    this.employers$ = this.employerService.getEmployers();
    this.employers$.subscribe({
      next: () => {
        const message = 'Das Laden der Arbeitgeber-Liste war erfolgreich';
        this.logService.log(message, 'INFO');
      },
      error: () => {
        const message = 'Fehler beim Laden der Arbeitgeber-Liste';
        this.logService.log(message, 'ERROR');
      },
    });
    this.getCountries();
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

  onSort({ column, direction }: SortEvent) {
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.employerService.sortColumn = column;
    this.employerService.sortDirection = direction;
  }

  openEmployer(employer: Employer): void {
    this.router.navigateByUrl(`/employer-overview/${employer.employerId}`);
  }

  getCountryById(countryId: number): Observable<any> {
    return this.countries$.pipe(
      map((countries: any) => {
        const country = countries.find((c: any) => c.countryId === countryId);
        return country.countryName;
      })
    );
  }
}

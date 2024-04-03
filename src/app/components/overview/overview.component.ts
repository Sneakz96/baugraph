import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {  Employer, EmployerService, LogService } from '@bau/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
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

  @ViewChildren(NgbdSortableHeaderDirective)
  headers!: QueryList<NgbdSortableHeaderDirective>;

  constructor(
    public employerService: EmployerService,
    private library: FaIconLibrary,
    private router: Router,
    private logService: LogService
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

  getCountryById(countryId: number): string {
    // const country = this.countries.find((c) => c.id === countryId);
    // return country ? country.name : '';
    return'';
  }
}

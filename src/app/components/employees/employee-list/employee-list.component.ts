import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, QueryList } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  Country,
  CountryService,
  EmployeeService,
  LogService,
} from '@bau/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Employee } from '@bau/core';
import { Observable, of } from 'rxjs';
import { NgbdSortableHeaderDirective } from '../../overview/sort.directive';
import { GridComponent } from '@bau/grid';

@Component({
  selector: 'bau-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AsyncPipe,
    FontAwesomeModule,
    GridComponent,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  employees$!: Observable<Employee[]>;
  countries$!: Observable<Country[]>;

  headers!: QueryList<NgbdSortableHeaderDirective>;
  headerlist = ['Name', 'Staatsangehörigkeit', 'Geburtstag', 'E-Mail'];
  constructor(
    private library: FaIconLibrary,
    private logService: LogService,
    public employeeService: EmployeeService,
    public countryService: CountryService
  ) {
    this.employees$ = this.employeeService.getEmployees();
    this.library.addIcons(faArrowLeft);
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
}

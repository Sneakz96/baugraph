import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Country, EmployeeService, EmployerService } from '@bau/core';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { NgbdSortableHeaderDirective, SortEvent } from '../../directive/sort.directive';

@Component({
  selector: 'bau-grid',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbdSortableHeaderDirective,
    NgbHighlight,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
  private readonly employeeService = inject(EmployeeService);

  @Input() headerlist!: string[];
  @Input() data!: Observable<any>;
  @Input() countries!: Observable<Country[]>;

  public employerService = inject(EmployerService);

  getCountryById(countryId: number): Observable<any> {
    return this.countries.pipe(
      map((countries: any) => {
        const country = countries.find((c: any) => c.countryId === countryId);
        return country.countryName;
      })
    );
  }
  
  onSort({ column, direction }: SortEvent) {
    // this.headers.forEach((header) => {
    //   if (header.sortable !== column) {
    //     header.direction = '';
    //   }
    // });
    this.employeeService.sortColumn = column;
    this.employeeService.sortDirection = direction;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService, EmployerService } from '@bau/core';
import {
  NgbdSortableHeaderDirective,
} from '../../directive/sort.directive';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

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
  public employerService = inject(EmployerService);
  // onSort({ column, direction }: SortEvent) {
  //   this.headers.forEach((header) => {
  //     if (header.sortable !== column) {
  //       header.direction = '';
  //     }
  //   });
  //   this.employeeService.sortColumn = column;
  //   this.employeeService.sortDirection = direction;
  // }
}

import { Injectable, inject } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { ApiService } from './api.service';
import { Employee } from '../models/employee';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SortColumn, SortDirection } from 'src/app/components/overview/sort.directive';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiService = inject(ApiService);

  employees$!: Observable<Employee[]>;
  private _search$ = new Subject<void>();

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  getEmployees(): Observable<Employee[]> {
    this.employees$ = this.apiService.get('employees');
    return this.employees$.pipe(
      map((employees) => employees.sort((a, b) => a.employeeId - b.employeeId))
    );
  }

  getEmployeeById(id: number): Observable<Employee | undefined> {
    return this.employees$.pipe(
      map((employees) => employees.find((c) => c.employeeId === id))
    );
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
}

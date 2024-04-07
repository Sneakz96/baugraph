import { DecimalPipe } from '@angular/common';
import { Injectable, PipeTransform, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  SortColumn,
  SortDirection,
} from '../../../../src/app/components/overview/sort.directive';
import { Employer } from '../models/employer';
import { ApiService } from './api.service';
import { Country } from '../models/country';

interface SearchResult {
  employers: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Injectable({ providedIn: 'root' })
export class EmployerService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _total$ = new BehaviorSubject<number>(0);

  employers!: Employer[];
  employers$!: Observable<Employer[]>;
  countries$!: Observable<Country[]>;

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  private pipe = inject(DecimalPipe);
  private apiService = inject(ApiService);

  constructor() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._total$.next(result.total);
      });
    this._search$.next();
    this.employers$ = this.apiService.get('employers');
  }

  sort(
    employer: Employer[],
    column: SortColumn,
    direction: string
  ): Employer[] {
    if (direction === '' || column === '') {
      return employer;
    } else {
      return [...employer].sort((a: any, b: any) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  getEmployers(): Observable<Employer[]> {
    this.employers$ = this.apiService.get('employers');
    return this.employers$.pipe(
      map((employers) => employers.sort((a, b) => a.employerId - b.employerId))
    );
  }

  getEmployerById(id: number): Observable<Employer | undefined> {
    return this.employers$.pipe(
      map((employers) => employers.find((e) => e.employerId === id))
    );
  }

  matches(employer: Employer, term: string, pipe: PipeTransform) {
    if (!this.countries$) {
      return false;
    }
    return this.countries$.pipe(
      map((countries) =>
        countries.find((country) => country.countryId === employer.employerCountryId)
      ),
      map((country) => {
        const countryName = country ? country.countryName : '';
        return (
          employer.employerName.toLowerCase().includes(term.toLowerCase()) ||
          countryName.toLowerCase().includes(term.toLowerCase()) ||
          employer.employerLocation.toLowerCase().includes(term.toLowerCase())
        );
      })
    );
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  set page(page: number) {
    this._set({ page });
  }

  get pageSize() {
    return this._state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({ pageSize });
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

  private _search(): Observable<SearchResult> {
    return this.employers$.pipe(
      map((employers) => {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } =
          this._state;
        let filteredEmployers = this.sort(employers, sortColumn, sortDirection);
        filteredEmployers = filteredEmployers.filter((employer) =>
          this.matches(employer, searchTerm, this.pipe)
        );
        const total = filteredEmployers.length;
        filteredEmployers = filteredEmployers.slice(
          (page - 1) * pageSize,
          (page - 1) * pageSize + pageSize
        );
        return { employers: filteredEmployers, total };
      })
    );
  }
}

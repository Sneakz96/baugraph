import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Industry } from '../models/industry';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class IndustryService {
  private apiService = inject(ApiService);

  industries$!: Observable<Industry[]>;

  getIndustries(): Observable<Industry[]> {
    this.industries$ = this.apiService.get('industries');
    return this.industries$.pipe(
      map((industries) => industries.sort((a, b) => a.id - b.id))
    );
  }

  getIndustryById(id: number): Observable<Industry | undefined> {
    return this.industries$.pipe(
      map((industries) => industries.find((c) => c.id === id))
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { Country } from '../models/country';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private apiService = inject(ApiService);

  countries$!: Observable<Country[]>;
  countries!: Country[];

  getCountries(): Observable<Country[]> {
    this.countries$ = this.apiService.get('countries');
    this.countries$.subscribe((c) => (this.countries = c));
    return this.countries$.pipe(
      map((countries) => countries.sort((a, b) => a.countryId - b.countryId))
    );
  }

  public getCountryNameById(id: number): string {
    const country = this.countries.find((c) => c.countryId === id);
    return country ? country.countryName : '';
  }

  public getCountryFlagById(id: number): string {
    const country = this.countries.find((c) => c.countryId === id);
    return country ? country.countryFlag : '';
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/';
  private http = inject(HttpClient);

  get(string: string): Observable<any[]> {
    const url = `${this.baseUrl}${string}`;
    return this.http.get<any[]>(url);
  }
}

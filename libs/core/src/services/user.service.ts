import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUser!: User;
  users$!: Observable<User[]>;

  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  login(username: string, password: string): void {
    this.users$ = this.apiService.get('users');
    this.users$.subscribe(a=>console.log(a));
    // this.router.navigateByUrl('/home');
    // this.currentUser = this.authService.setUser(username, password);
  }

  getUsers(): Observable<User[]> {
    this.users$ = this.apiService.get('users');
    return this.users$;
  }

  // getIndustryById(id: number): Observable<Industry | undefined> {
  //   return this.industries$.pipe(
  //     map((industries) => industries.find((c) => c.id === id))
  //   );
  // }

  // getUserName(): string {
  //   return this.currentUser?.username;
  // }

  // getLoginStatus(): boolean {
  //   return this.currentUser?.status;
  // }

  // getUserRights(): string {
  //   return this.currentUser?.title;
  // }
}

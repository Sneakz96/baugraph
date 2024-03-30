import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {
  currentUser!: User;

  private authService = inject(AuthService);
  private router = inject(Router);

  login(username: string, password: string): void {
    this.router.navigateByUrl('/home');
    this.currentUser = this.authService.setUser(username, password);
  }

  getUserName(): string {
    return this.currentUser?.username;
  }

  getLoginStatus(): boolean {
    return this.currentUser?.status;
  }

  getUserRights(): string {
    return this.currentUser?.title;
  }
}

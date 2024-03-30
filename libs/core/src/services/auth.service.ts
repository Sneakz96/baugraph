import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { LogService } from './log.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser!: User;
  private logService = inject(LogService);

  setUser(username: string, password: string): User {
    this.logService.log(username, 'INFO');
    return this.currentUser = {
      title: 'Admin',
      username: username,
      password,
      name: 'Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      age: 99,
      //   jwt:
      status: true,
    };
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '@bau/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bau-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  password!: FormControl<unknown>;
  username!: FormControl<unknown>;

  login(): void {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';
    this.userService.login(username, password);
  }

  createAccount(): void {
    console.log('create Account called!');
  }
}

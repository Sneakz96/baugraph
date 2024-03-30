import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '@bau/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bau-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  password!: FormControl<unknown>;
  username!: FormControl<unknown>;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
  }

  private createForm() {
    this.registerForm = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  createAccount(): void {
    console.log('create Account called!', this.registerForm.value);
  }
}

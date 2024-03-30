import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bau-input',
  standalone: true,
  imports: [CommonModule, NgbNavModule, NgbDropdownModule, RouterModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {}

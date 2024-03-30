import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bau-navbar',
  standalone: true,
  imports: [CommonModule, NgbNavModule, NgbDropdownModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@bau/core';
import { ToastsContainerComponent } from '@bau/toast';

@Component({
  standalone: true,
  selector: 'bau-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    CommonModule,
    NavbarComponent,
    ToastsContainerComponent,
  ],
})
export class AppComponent {}

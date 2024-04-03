import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@bau/core';

@Component({
  standalone: true,
  selector: 'bau-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterModule,
    CommonModule,
    NavbarComponent,
  ],
})
export class AppComponent {

  public readonly server_status = '';
}

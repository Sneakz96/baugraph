import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiService, UserService } from '@bau/core';

@Component({
  selector: 'bau-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly userService = inject(UserService);
  private readonly uiService = inject(UiService);
  // public readonly isLoggedIn = this.userService.getLoginStatus();
  // public readonly loggedInAs = this.userService.getUserName();
  // public readonly userRights = this.userService.getUserRights();
  public readonly greeting = this.uiService.checkDayTime();
  public readonly currentTime = new Date();
}

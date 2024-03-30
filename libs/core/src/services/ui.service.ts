import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiService {
  currentTime = new Date();

  checkDayTime(): string {
    const time = this.currentTime.getHours();
    if (time < 11) {
      const greeting = 'Guten Morgen!';
      return greeting;
    } else if (time < 17) {
      const greeting = 'Mahlzeit!';
      return greeting;
    } else if (time < 24) {
      const greeting = 'Guten Abend!';
      return greeting;
    } else return '';
  }
}

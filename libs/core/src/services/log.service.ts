import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LogService {
  currentTime = new Date();

  formattedDate = `${this.currentTime.getFullYear()} ${LogService.getMonthName(
    this.currentTime.getMonth()
  )} ${this.currentTime.getDate()}`;

  log(message: string, level: string) {
    const color = this.setColor(level);
    console.log(
      `%c${this.formattedDate} | ${this.setTime()} | %c${level} %c| ${message}`,
      'color: inherit',
      `color: ${color}`,
      'color: inherit'
    );
  }

  private setColor(level: string) {
    let color = '';
    switch (level.toUpperCase()) {
      case 'SUCCESS':
        color = 'lightgreen';
        break;
      case 'ERROR':
        color = 'red';
        break;
      case 'WARN':
        color = 'orange';
        break;
      case 'INFO':
        color = 'lightblue';
        break;
      default:
        color = 'white';
    }
    return color;
  }

  private setTime() {
    const hours = this.currentTime.getHours().toString().padStart(2, '0');
    const minutes = this.currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = this.currentTime.getSeconds().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  }

  private static getMonthName(month: number): string {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return months[month];
  }
}

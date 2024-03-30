import { Component, HostBinding, inject } from '@angular/core';

import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'bau-toasts',
  imports: [NgbToastModule, NgTemplateOutlet, NgbModule, CommonModule],
  standalone: true,
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts; let i = index"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngTemplateOutlet]="toast.body"></ng-template>
    </ngb-toast>
  `,
})
export class ToastsContainerComponent {
  @HostBinding('class') toastContainerClass =
    'toast-container position-fixed top-0 end-0 p-3 background-primary';
  @HostBinding('style.zIndex') zIndex = 1200;
  toastService = inject(ToastService);

  constructor() {
    this.toastService.toasts$.subscribe(() => {
      // console.log('Init-Komponente', toasts);
    });
  }
}

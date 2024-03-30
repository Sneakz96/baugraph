import { CommonModule } from '@angular/common';
import { Component, TemplateRef, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { Toast, ToastService } from '../../services/toast.service';

@Component({
  selector: 'bau-toasts',
  standalone: true,
  imports: [CommonModule, NgbToastModule],
  templateUrl: './toasts.component.html',
})
export class ToastComponent {
  toastService = inject(ToastService);
  defaultDelay = 3000;

  getTemplate = (toast: Toast) => {
    return toast.body as TemplateRef<unknown>;
  };

  close = (toast: Toast) => {
    this.toastService.remove(toast);
  };

  reject = (toast: Toast) => {
    toast.rejectBtnCallback();
    this.close(toast);
  };

  accept = (toast: Toast) => {
    toast.acceptBtnCallback();
    this.close(toast);
  };
}

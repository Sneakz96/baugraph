import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum TOAST_TYPE {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export interface Toast {
  header: string;
  body: any;
  autohide: boolean;
  classname?: string;
  delay?: number;
  rejectBtnCallback?: any;
  acceptBtnCallback?: any;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];
  public toastSubject = new BehaviorSubject<Toast[]>(this.toasts);
  toasts$ = this.toastSubject.asObservable();

  public show(toast: Toast, type: TOAST_TYPE) {
    if (type === TOAST_TYPE.INFO) {
      toast.delay = 3000;
      toast.classname = 'success';
    }
    if (type === TOAST_TYPE.WARN) {
      toast.delay = 3000;
      toast.classname = '';
    }
    if (type === TOAST_TYPE.ERROR) {
      toast.delay = 3000;
      toast.classname = '';
    }
    this.toasts.push(toast);
  }

  public remove(toast: Toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
    this.toastSubject.next(this.toasts);
  }
}

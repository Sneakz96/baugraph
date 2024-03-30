import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class WebsiteValidator {
  validate(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const websitePattern =
        /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/\S*)?$/i;
      if (control.value && !websitePattern.test(control.value)) {
        return { invalidWebsite: true };
      }
      return null;
    };
  }
}

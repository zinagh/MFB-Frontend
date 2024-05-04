import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validatePositiveBalance(control: AbstractControl): ValidationErrors | null {
  const balance = control.value;
  if (balance !== null && balance < 0) {
    return { negativeBalance: true };
  }
  return null;
}

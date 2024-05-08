import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validatePositiveBalance(control: AbstractControl): ValidationErrors | null {
  const balance = control.value;
  if (balance !== null && balance < 0) {
    return { negativeBalance: true };
  }
  return null;
}
export function validateamount(control: AbstractControl): ValidationErrors | null {
  const amount = control.value;
  if (amount !== null && amount < 0) {
    return { negativeamount: true };
  }
  return null;
}

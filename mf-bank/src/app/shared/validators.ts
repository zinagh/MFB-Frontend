import { AbstractControl, ValidatorFn } from "@angular/forms";

 export function validateDateOfBirth(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value) {
    const birthday = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    if (age < 18) {
      return { 'invalidDateOfBirth': true };
    }
  }
  return null;
}

 export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;

    // Regex patterns for password validation
    const uppercasePattern = /[A-Z]/;
    const symbolPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberPattern = /[0-9]/;

    // Check if the password meets all criteria
    const isValid =
      uppercasePattern.test(value) &&
      symbolPattern.test(value) &&
      numberPattern.test(value);

    // Return validation result
    return isValid ? null : { 'invalidPassword': true };
  };
}

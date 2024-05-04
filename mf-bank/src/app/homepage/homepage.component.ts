import { Router } from '@angular/router';
import { SecurityService } from './../services/security.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Role } from '../models/Role';
import { Userdto } from '../models/Userdto';
import { passwordValidator, validateDateOfBirth } from '../shared/validators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit  {

  constructor(private router: Router ,private formBuilder: FormBuilder, private userService: UsersService){}
  isNext: boolean = false;

  switchToNext(){
    this.isNext = !this.isNext;
    console.log(this.confirmPassword);
  }
  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  userForm!: FormGroup;


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', passwordValidator()],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', validateDateOfBirth],
      cin: ['', Validators.pattern('[0-9]{8}')],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      role: [Role.STUDENT]
    });
  }
  confirmPassword!: string;
  noMatch: boolean = false;
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.confirmPassword = inputElement.value;
  }

  onSubmit(): void {
    // Check if the form is valid
    if (this.userForm.valid) {
      let password: string = this.userForm.get('password')?.value;
      if (this.confirmPassword === password) {
        let user: Userdto;
        user = this.userForm.value;
        console.log(user);
        this.userService.addUser(user).subscribe(
          response => {
            console.log('User added successfully');
            this.userForm.reset();
            this.navigateToDashboard();
          },
          error => {
            console.error('An error occurred:', error);
          }
        );
      } else {
        this.noMatch = true;
      }
    } else {
      const userNameControl = this.userForm.get('userName');
      if (userNameControl?.errors?.['required']) {
        userNameControl.markAsTouched();
      }
    }
     const prenomControl = this.userForm.get('prenom');
     if (prenomControl?.errors?.['required']) {
       prenomControl.markAsTouched();
     }

     const userNameControl = this.userForm.get('nom');
     if (userNameControl?.errors?.['required']) {
       userNameControl.markAsTouched();
     }
     const emailControl = this.userForm.get('email');
     if (emailControl?.errors?.['required'] || emailControl?.errors?.['email']) {
       emailControl.markAsTouched();
     }
     const cinControl = this.userForm.get('cin');
     if (cinControl?.errors?.['pattern']) {
       cinControl.markAsTouched();
     }
     const numTelControl = this.userForm.get('numTel');
    if (numTelControl?.errors?.['required'] || numTelControl?.errors?.['pattern']) {
      numTelControl.markAsTouched();
    }
    const passwordControl = this.userForm.get('password');
    if (passwordControl?.errors?.['invalidPassword']) {
      // Display a message for invalid password
      console.log('Password must contain at least one uppercase letter, one symbol, and one number.');
    }
  }


}

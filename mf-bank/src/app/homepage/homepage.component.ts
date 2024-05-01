import { Router } from '@angular/router';
import { SecurityService } from './../services/security.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Role } from '../models/Role';
import { Userdto } from '../models/Userdto';

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
      userName: [''],
      password: [''],
      nom: [''],
      prenom: [''],
      dateNaissance: [''],
      cin: [''],
      email: [''],
      numTel: [''],
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
    let password: string = this.userForm.get('password')?.value;
        if(this.confirmPassword === password) {
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
  }

}

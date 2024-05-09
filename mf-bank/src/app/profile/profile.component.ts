import { SecurityService } from './../services/security.service';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Userdto } from '../models/Userdto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { passwordValidator } from '../shared/validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {
  userForm!: FormGroup;
  ispassw :boolean = false ;
  username!: string;
  isprofile : boolean = true ;
  updateAllowed: boolean = false;
 user!:Userdto;
  constructor(private route: ActivatedRoute , private router: Router, private usersService: UsersService , private FormBuilder: FormBuilder , public securityService: SecurityService , ) {}
  topassw(){
   this.ispassw  = true ;
    this.isprofile  = false ;
  }
  toprofile(){
    this.ispassw = false ;
    this.isprofile= true ;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['id'];
    });
    this.userForm = this.FormBuilder.group({

      password: ['', passwordValidator()],


    });
    {
      if (this.securityService.profile && this.securityService.profile.username) {
        console.log(this.securityService.profile);
        this.username = this.securityService.profile.username;
      }
    };
    this.retrieveUser(this.username);
  }




  navigateToUpdate(){
    if (this.username) {
      this.router.navigate(['/updateProfile', { id: this.username }]);
    }
  }

  retrieveUser(username: string) {
    this.usersService.retrieveUser(username).subscribe(
      (data) => {
    this.user = data;
    console.log("heyy : " + this.user.nom + this.user.dateNaissance);
      }
    );

  }

  confirmPassword!: string;

  noMatch: boolean = false;
  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.confirmPassword = inputElement.value;
  }
  confirmUpdate(): void {
    if (confirm('Are you sure you want to update this User?')) {

        console.log();
        this.updateAllowed = true;
        this.updatePassword();

    } else {
      this.updateAllowed = false;
    }
  }


  updatePassword(): void {
    if (this.updateAllowed) {
      let password: string = this.userForm.get('password')?.value;
      if (password === this.confirmPassword) {
        const username = this.username;
        const newPassword = this.confirmPassword;
        const verifyPassword = this.confirmPassword;

        this.usersService.updatePassword(username, newPassword, verifyPassword).subscribe(
          (response) => {
            console.log('Password successfully updated:', response);
            this.userForm.reset();
            this.toprofile();

          },
          (error) => {
            console.error('Failed to update password:', error);
          }
        );
      } else {
        console.error('Passwords do not match');
      }

      const passwordControl = this.userForm.get('password');
      if (passwordControl?.errors?.['invalidPassword']) {
        console.log('Password must contain at least one uppercase letter, one symbol, and one number.');
      }
    } else {
      console.log('Profile update cancelled.');
    }
  }

  profile() {
    if (this.username) {
      this.router.navigate(['/profile', { id: this.username }]);
    }}





}

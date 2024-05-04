import { Userdto } from './../models/Userdto';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Role } from '../models/Role';
import { ProfileComponent } from '../profile/profile.component';
import { validateDateOfBirth } from '../shared/validators';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent  implements OnInit {
  constructor(private router: Router ,private formBuilder: FormBuilder, private userService: UsersService , private route: ActivatedRoute ){}
  showSuccessMessage: boolean = false;
  updateAllowed: boolean = false;


  userForm!: FormGroup;
  user!:Userdto;
  username!: string ;
   users!: Userdto[];
   index!: number;

ngOnInit(): void {
  this.userForm = this.formBuilder.group({

    nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.pattern('[0-9]{8}')],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],

  });

    this.route.params.subscribe(params => {
      this.username = params['id'];
    });

      this.retrieveUser(this.username);

}
profile() {
  if (this.username) {
    this.router.navigate(['/profile', { id: this.username }]);
  }}

  confirmUpdate(user: Userdto | undefined): void {
    if (confirm('Are you sure you want to update this User?')) {
      if (user) {
        console.log(user);
        // Set updateAllowed to true to allow the update
        this.updateAllowed = true;
        this.onSubmit();
      }
    } else {
      // Set updateAllowed to false to block the update
      this.updateAllowed = false;
    }
  }

  onSubmit(): void {
    // Check if the update is allowed
    if (this.updateAllowed) {
      let user: Userdto;
      user = this.userForm.value;
      user.userName = this.username;
      user.role = this.user.role;
      console.log(user);
      this.userService.modifierUser(user).subscribe(
        (response) => {
          console.log('Updated successfully:', response);
          this.userForm.reset();
          this.profile();
        },
        (error) => {
          console.error('Failed to Update profile:', error);
        }
      );
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

      // Reset updateAllowed for future updates
      this.updateAllowed = false;
    } else {
      // Optionally, inform the user that the update was cancelled
      console.log('Profile update cancelled.');
    }
  }




retrieveUser(username: string) {
  this.userService.retrieveUser(username).subscribe(
    (data) => {
  this.user = data ;
  console.log(this.user);
  const dateNaissance = this.user.dateNaissance ? new Date(this.user.dateNaissance).toISOString().split('T')[0] : null;
  this.userForm.patchValue({
    nom: this.user.nom,
    prenom: this.user.prenom,
    dateNaissance: dateNaissance,
    cin: this.user.cin,
    email: this.user.email,
    numTel: this.user.numTel

  });
}
  );

}

}

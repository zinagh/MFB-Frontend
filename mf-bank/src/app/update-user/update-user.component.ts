import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Userdto } from '../models/Userdto';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  constructor(private router: Router ,private formBuilder: FormBuilder, private userService: UsersService , private route: ActivatedRoute ){}
  userForm!: FormGroup;
  user!:Userdto;
  username!: string ;


  navigateTousers(){
    this.router.navigate(['/users', { id: this.username }]);
  }

ngOnInit(): void {
  this.userForm = this.formBuilder.group({

    nom: [''],
    prenom: [''],
    dateNaissance: [''],
    cin: [''],
    email: [''],
    numTel: ['']

  });

    this.route.params.subscribe(params => {
      this.username = params['id'];
    });

      this.retrieveUser(this.username);
}



onSubmit(): void {
  let user: Userdto;
  user = this.userForm.value;
  user.userName = this.username;
  user.role = this.user.role;
  console.log(user);
  this.userService.modifierUser(user).subscribe(
    (response) => {
      console.log('Client added successfully:', response);
      this.userForm.reset();
      this.navigateTousers();
    },
    (error) => {
      console.error('Failed to add team:', error);
    }
  );
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

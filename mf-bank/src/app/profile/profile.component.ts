import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  ispassw :boolean = false ;
  isprofile : boolean = true ;
  topassw(){
   this.ispassw  = true ;
    this.isprofile  = false ;
  }
  toprofile(){
    this.ispassw = false ;
    this.isprofile= true ;
  }
}

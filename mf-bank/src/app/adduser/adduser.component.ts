import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  constructor(private router: Router){}

  isCompany: boolean = false;
  isEmployee: boolean = false;
  isUniversity: boolean = false;

  onTypeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if(value == "company"){
      this.isCompany = true;
      this.isEmployee = false;
      this.isUniversity = false;
    } else if(value == "employee"){
      this.isCompany = false;
      this.isEmployee = true;
      this.isUniversity = false;
    } else if(value == "university"){
      this.isCompany = false;
      this.isEmployee = false;
      this.isUniversity = true;
    }
  }


  navigateTousers(){
    this.router.navigate(['/users']);
  }

}

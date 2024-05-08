import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  constructor(private router: Router){}
  navigateTousers(){
    this.router.navigate(['/profile']);
  }

}

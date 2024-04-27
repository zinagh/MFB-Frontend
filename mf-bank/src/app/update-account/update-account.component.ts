import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent {
  constructor(private router: Router ){}
  navigateToupdate(){
    this.router.navigate(['/accountManagement']);
  }
}

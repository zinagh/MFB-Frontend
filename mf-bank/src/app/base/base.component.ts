import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  constructor (public securityService: SecurityService , private router :Router)  {}
  isEmployee: boolean = this.securityService.hasRoleIn(['EMPLOYEE']);

  username: string = "";
  public ngOnInit() {
    if (this.securityService.profile && this.securityService.profile.username) {
      console.log(this.securityService.profile);
      this.username = this.securityService.profile.username;
    }
  }
  profile() {
    if (this.username) {
      this.router.navigate(['/profile', { id: this.username }]);
    }}
  onLogout() {
    this.securityService.kcService.logout(window.location.origin);
  }

}

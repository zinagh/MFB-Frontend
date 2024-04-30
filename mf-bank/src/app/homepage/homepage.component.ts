import { Router } from '@angular/router';
import { SecurityService } from './../services/security.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit  {

  constructor(private router: Router){}

  ngOnInit(): void {

  }

  navigateToDashboard(){
    this.router.navigate(['/dashboard']);
  }

}

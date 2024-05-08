import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addfee',
  templateUrl: './addfee.component.html',
  styleUrls: ['./addfee.component.css']
})
export class AddfeeComponent {
  
  constructor(private router: Router) {}

  navigateTofees() {
    this.router.navigate(['/fees']);
  }

}

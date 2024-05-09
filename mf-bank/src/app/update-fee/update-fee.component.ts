import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-fee',
  templateUrl: './update-fee.component.html',
  styleUrls: ['./update-fee.component.css']
})
export class UpdateFeeComponent {
  constructor(private router: Router) {}

  navigateTofees() {
    this.router.navigate(['/fees']);
  }

}

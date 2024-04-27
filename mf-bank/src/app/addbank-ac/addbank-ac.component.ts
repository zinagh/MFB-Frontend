import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addbank-ac',
  templateUrl: './addbank-ac.component.html',
  styleUrls: ['./addbank-ac.component.css']
})
export class AddbankAcComponent {
  constructor(private Router: Router){}
  navigateToBankAcc(){
    this.Router.navigate(['/bankaccount']);
  }
}

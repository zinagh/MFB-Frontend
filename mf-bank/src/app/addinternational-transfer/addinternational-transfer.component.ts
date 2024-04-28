import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addinternational-transfer',
  templateUrl: './addinternational-transfer.component.html',
  styleUrls: ['./addinternational-transfer.component.css']
})
export class AddinternationalTransferComponent {
  sendOrReceive: boolean = true;
  approval: boolean = false;
  fees: boolean = false;
  status: string = ''; 

  constructor(private Router: Router){}
  navigateTointernationaltransfer(){
    this.Router.navigate(['/internationaltransfer']);
  }

}

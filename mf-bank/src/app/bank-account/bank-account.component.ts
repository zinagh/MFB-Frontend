import { Component } from '@angular/core';
import { BankAccountDto } from '../models/models/BankAccountDto';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent {

  bankaccounts: BankAccountDto[] = [];

 // ngOnInit() :void {
//this.loadBankaccounts();
 //}
  //loadBankaccounts() :void {
   // this.bankaacountService.getallbankaccounts().subscribe(accounts  => {
    //  this.bankaccounts = accounts;
   // });
  }



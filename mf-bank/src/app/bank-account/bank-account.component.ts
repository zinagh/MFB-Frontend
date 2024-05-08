import { Component, OnInit } from '@angular/core';
import { BankAccountDto } from '../models/models/BankAccountDto';
import { BankaacountService } from '../services/bankaacount.service';
import { debounce } from 'rxjs';
import { TypeBankAccount } from '../models/TypeBankAccount';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit{
  constructor(private bankservice: BankaacountService , private router: Router){}
  TypeBankAccount = TypeBankAccount;
  accountNumber!: string;
  bankaccounts: BankAccountDto[] = [];
  inputValue: string = '';
  debounceTimer: any;
  isSpecificBankAccount: boolean = false;
  

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
    if(this.inputValue != ""){
      this.isSpecificBankAccount = true;
    } else {
      this.isSpecificBankAccount = false;
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
      this.debounceTimer = setTimeout(() => {
      this.loadBankaccountByTitulaire(this.inputValue);
    }, 2000);
  }
    
  

  ngOnInit() :void {
    this.loadBankaccounts();
    

  }


  loadBankaccounts() :void {
    this.bankservice.retrieveAllBankAccounts().subscribe(data  => {
     this.bankaccounts = data;
     console.log(this.bankaccounts);
    });
}

bankaccount!: BankAccountDto;

loadBankaccountByTitulaire(name: string) :void {
  this.bankservice.retrieveBankAccountByTitulaire(name).subscribe(data  => {
    this.bankaccount = data;
   console.log(this.bankaccount);
  });
}

confirmDelete(accountNumber: string | undefined): void {
  if (confirm('Are you sure you want to delete this bank account?')) {
      if(accountNumber){
        console.log(accountNumber)
      this.removeBankAccount(accountNumber);
      }
  }
}

removeBankAccount(accountNumber: string): void {
  this.bankservice.removeBankAccount(accountNumber).subscribe(
    () => {
      console.log('account removed successfully');
      this.loadBankaccounts();
    },
    (error) => {
      console.error('Failed to remove account:', error);
    }
  );
}
}


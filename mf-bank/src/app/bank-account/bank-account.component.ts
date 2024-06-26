import { Component, OnInit } from '@angular/core';
import { BankaacountService } from '../services/bankaacount.service';
import { TypeBankAccount } from '../models/TypeBankAccount';
import { Router } from '@angular/router';
import { BankAccountDto } from '../models/BankAccountDto';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit{
  constructor(private bankservice: BankaacountService , private router: Router,
    public securityService: SecurityService
  ){}
  TypeBankAccount = TypeBankAccount;
  accountNumber!: string;
  bankaccounts: BankAccountDto[] = [];
  inputValue: string = '';
  debounceTimer: any;
  isSpecificBankAccount: boolean = false;

  isThisEmployee: boolean = this.securityService.hasRoleIn(['EMPLOYEE']);

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
    }, 1000);
  }



  ngOnInit() :void {
    this.loadBankaccounts();
this.loadMeBankaccountByTitulaire();

  }
  accountManagement(accountNumber: string | undefined) {
    if (accountNumber) {
      this.router.navigate(['/accountManagement', { id: accountNumber }]);
    }}

    bankaccountNumber!: string | undefined;

    loadMeBankaccountByTitulaire() :void {
      if(this.securityService.profile?.username) {
      this.bankservice.retrieveBankAccountByTitulaire(this.securityService.profile?.username).subscribe(data  => {
       this.bankaccountNumber = data.accountNumber;
      });
    }
    }

    navigateToMebankAccount() {
      console.log(this.bankaccountNumber);
      if (this.bankaccountNumber) {
        this.router.navigate(['/accountManagement', { id: this.bankaccountNumber }]);
      }
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


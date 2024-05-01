import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankaacountService } from '../services/bankaacount.service';
import { BankAccountDto } from '../models/models/BankAccountDto';
import { TypeBankAccount } from '../enums/TypeBankAccount';

@Component({
  selector: 'app-addbank-ac',
  templateUrl: './addbank-ac.component.html',
  styleUrls: ['./addbank-ac.component.css']
})
export class AddbankAcComponent {
  bankAccountDto: BankAccountDto = {} as BankAccountDto;
  activated: boolean = false;
  fees: string = '';
  bankAccountTypes = ['currentAccount', 'savingsAccount'];
  selectedType: TypeBankAccount = TypeBankAccount.currentAccount;

  constructor(private router: Router , private bankAccountService: BankaacountService) {}

  navigateToBankAcc() {
    this.router.navigate(['/bankaccount']);
  }

  updateFees() {
    console.log('Selected bank account type:', this.selectedType); // Check selectedType value
    if (this.selectedType === TypeBankAccount.currentAccount) {
      this.fees = 'TRANSACTION_FEE_currentAccount';
      console.log('Fees:', this.fees); // Check updated fees value
    } else if (this.selectedType === TypeBankAccount.savingsAccount) {
      this.fees = 'TRANSACTION_FEE_savingsAccount';
      console.log('Fees:', this.fees); // Check updated fees value
    }
  }

  ngOnInit(): void {
   
  }

  onSubmit(form: any) { // Pass the form as an argument
    this.bankAccountDto.titulaire = form.titulaire;
    this.bankAccountDto.type = this.selectedType;
    // Similarly, bind other form fields to the bankAccountDto object

    this.bankAccountService.addBankAccount(this.bankAccountDto).subscribe(
      () => {
        console.log('Bank account added successfully!');
        // Reset the form or handle success as required
      },
      error => {
        console.error('Error adding bank account:', error);
        // Handle error as required
      }
    );
  }
}

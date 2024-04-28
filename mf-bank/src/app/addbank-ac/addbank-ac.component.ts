import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbank-ac',
  templateUrl: './addbank-ac.component.html',
  styleUrls: ['./addbank-ac.component.css']
})
export class AddbankAcComponent {
  activated: boolean = false;
  fees: string = '';
  bankAccountTypes = ['currentAccount', 'savingsAccount'];
  selectedType: string = '';

  constructor(private router: Router) {}

  navigateToBankAcc() {
    this.router.navigate(['/bankaccount']);
  }

  updateFees() {
    console.log('Selected bank account type:', this.selectedType); // Check selectedType value
    if (this.selectedType === 'currentAccount') {
      this.fees = 'TRANSACTION_FEE_currentAccount';
      console.log('Fees:', this.fees); // Check updated fees value
    } else if (this.selectedType === 'savingsAccount') {
      this.fees = 'TRANSACTION_FEE_savingsAccount';
      console.log('Fees:', this.fees); // Check updated fees value
    }
  }
}

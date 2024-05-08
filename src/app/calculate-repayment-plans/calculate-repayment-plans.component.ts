import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RepaymentServiceService } from './repayment-service.service';  // Update path as needed

@Component({
  selector: 'app-calculate-repayment-plans',
  templateUrl: './calculate-repayment-plans.component.html',
  styleUrls: ['./calculate-repayment-plans.component.css']
})
export class CalculateRepaymentPlansComponent {
  // Define the form group to manage the form
    repaymentPlans: any[] = [];
  form = new FormGroup({
    creditAmount: new FormControl('', [Validators.required]),
    annualInterestRate: new FormControl('', [Validators.required]),
    creditDurationInYears: new FormControl('', [Validators.required]),
    creditStartDate: new FormControl('', [Validators.required]),
  });

  constructor(
    private repaymentService: RepaymentServiceService, 
    private router: Router
  ) {}
  onSubmit() {
    if (this.form.valid) {
      this.repaymentService.calculateRepaymentPlans(this.form.value).subscribe({
        next: (data) => {
          console.log('Repayment plans calculated:', data);
          this.repaymentPlans =[...data]; // Mettre à jour les plans de remboursement
          this.router.navigate(['/excel']);
        },
        error: (error) => {
          console.error('Error fetching repayment plans', error);
        }
      });
    }
  }
}

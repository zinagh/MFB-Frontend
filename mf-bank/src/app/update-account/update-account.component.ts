import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankaacountService } from '../services/bankaacount.service';
import { BankAccountDto } from '../models/BankAccountDto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent  implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute,
    private bankservice: BankaacountService,
    private formBuilder: FormBuilder
   ){}
   activated = new FormControl();

  accountNumber!: string;
  accountForm!: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.accountNumber = id;
        console.log(this.accountNumber);
      }
    });

    this.accountForm = this.formBuilder.group({
      account_balance: [''],
      activated: ['']
    });
    this.retrieveByAccountNumber();
    
  }
  navigateToAccount(){
    this.router.navigate(['/accountManagement']);
  }

  bankAccount!: BankAccountDto;
  retrieveByAccountNumber(){
    this.bankservice.retrieveBankAccount(this.accountNumber).subscribe(
    (data) => {
        this.bankAccount = data;
        console.log(this.bankAccount);
        this.accountForm.patchValue({
          account_balance: this.bankAccount.account_balance,
          activated: this.bankAccount.activated
        });
    
      },
      (error: any) => {
        console.error('Error retrieving bank account by titulaire:', error);
      }
    );
  }

  onSubmit(){

  }

}

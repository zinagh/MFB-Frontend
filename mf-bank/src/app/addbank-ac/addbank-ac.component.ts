import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankaacountService } from '../services/bankaacount.service';
import { TypeBankAccount } from '../enums/TypeBankAccount';
import { AbstractControl, FormBuilder, FormGroup ,ValidationErrors,Validators  } from '@angular/forms';
import { validatePositiveBalance } from '../shared/validators';
import { UsersService } from '../services/users.service';
import { Userdto } from '../models/Userdto';
import { BankAccountDto } from '../models/BankAccountDto';


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

  constructor(private router: Router , private bankservice: BankaacountService,
     private formBuilder: FormBuilder, private userservice: UsersService) {}

  navigateToBankAcc() {
    this.router.navigate(['/bankaccount']);
  }

  accountForm!: FormGroup;


  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      titulaire:['Choose a User'],
      account_balance: ['' , validatePositiveBalance],
      type: ['' , Validators.required],
      negativeSoldeDepassementDay: ['', Validators.required],
    });
    const accountBalanceControl = this.accountForm.get('accountBalance');
    if (accountBalanceControl) {
      accountBalanceControl.setValidators(this.validateAccountBalance);
    }

    this.accountForm.get('accountBalance')?.setValidators(this.validateAccountBalance);
    this.retrieveAllUsers();
  }
  TypeBankAccount = TypeBankAccount;




  onSubmit(): void {
    if (this.accountForm.valid) {
      const account: BankAccountDto = this.accountForm.value;
      this.bankservice.addBankAccount(account).subscribe(
        (response) => {
          console.log('Bank account added successfully:', response);
          this.accountForm.reset();
          this.navigateToBankAcc();
        },
        (error) => {
          console.error('Failed to add bank account:', error);
        }
      );
    } else {
      this.accountForm.markAllAsTouched();
    }
  }


 validateAccountBalance(control: AbstractControl): ValidationErrors | null {
    const balance = control.value;
    if (balance && balance < 0) {
      return { invalidBalance: true };
    }
    return null;
  }

  users: Userdto[] = [];
  retrieveAllUsers(){
    this.userservice.retrieveAllUsers().subscribe(
    (data) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error retrieving users:', error);
      }
    );
  }

}


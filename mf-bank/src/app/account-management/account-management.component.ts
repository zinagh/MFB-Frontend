import { Component, OnInit } from '@angular/core';
import { BankAccountDto } from '../models/BankAccountDto';
import { BankaacountService } from '../services/bankaacount.service';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit{

  constructor(private bankservice: BankaacountService, public securityService: SecurityService,
    private router: Router
  ) { }

  username!: string;
  bankAccount!: BankAccountDto;
ngOnInit(): void {
  if (this.securityService.profile && this.securityService.profile.username) {
    this.username = this.securityService.profile.username;
    console.log(this.username);
  }
  this.retrieveByUsername(this.username);
  }

  retrieveByUsername(userW: string){
    this.bankservice.retrieveBankAccountByTitulaire(userW).subscribe(
    (data) => {
        this.bankAccount = data;
        console.log(this.bankAccount);
      },
      (error: any) => {
        console.error('Error retrieving bank account by titulaire:', error);
      }
    );
  }

  navigateToupdate(accountNumber: string | undefined){
    if(accountNumber) {
    this.router.navigate(['/updateAccount' , {id: accountNumber}]);
  }
  }


}

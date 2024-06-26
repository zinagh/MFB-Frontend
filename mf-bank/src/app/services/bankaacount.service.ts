import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, switchMap } from 'rxjs';
import { BankAccountDto } from '../models/BankAccountDto';
import { Userdto } from '../models/Userdto';
import { QuestionDto } from '../models/QuestionDto';


@Injectable({
  providedIn: 'root'
})


export class BankaacountService {


  readonly apiUrl = 'http://localhost:9000/account';

  private userManagementUrl = 'http://localhost:9000/user';

  constructor(private http : HttpClient) {}

  retrieveAllBankAccounts(): Observable<BankAccountDto[]> {
    return this.http.get<BankAccountDto[]>(this.apiUrl + "/getallbankaccounts")
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred while retrieving bank accounts:', error);
          throw error;
        })
      );
  }


  retrieveBankAccount(bankAccountId: string): Observable<BankAccountDto> {
    return this.http.get<BankAccountDto>(`${this.apiUrl}/getbankaccountby/${bankAccountId}`).pipe(
      catchError(error => {
        console.error('Error retrieving bank account:', error);
        throw new Error('Error retrieving bank account');
      })
    );
  }

  retrieveBankAccountByTitulaire(bankAccountTitulaire: string): Observable<BankAccountDto> {
    return this.http.get<BankAccountDto>(`${this.apiUrl}/getbankaccountbyTitulaire/${bankAccountTitulaire}`).pipe(
      catchError(error => {
        console.error('Error retrieving bank account by titulaire:', error);
        throw new Error('Error retrieving bank account by titulaire');
      })
    );
  }

  retrieveAccountBalance(bankAccountTitulaire: string): Observable<number> {
    return this.http.get<any>(`${this.apiUrl}/getbankaccountbyTitulaire/${bankAccountTitulaire}`).pipe(
      map(response => {
        if (response) {
          return response.account_balance;
        } else {
          return 0.0;
        }
      }),
      catchError(error => {
        console.error('Error retrieving account balance:', error);
        throw new Error('Error retrieving account balance');
      })
    );
  }



  addBankAccount(bankAccountDto: BankAccountDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/addbankaccount`, bankAccountDto).pipe(
      catchError(error => {
        console.error('Error adding bank account:', error);
        throw new Error('Error adding bank account');
      })
    );
  }

  removeBankAccount(bankAccountId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletebankaccountby/${bankAccountId}`).pipe(
      catchError(error => {
        console.error('Error removing bank account:', error);
        throw new Error('Error removing bank account');
      })
    );
  }

  modifyBankAccount(bankAccountDto: BankAccountDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/modifybankaccount`, bankAccountDto).pipe(
      catchError(error => {
        console.error('Error modifying bank account:', error);
        throw new Error('Error modifying bank account');
      })
    );
  }

  private retrieveUserDetails(username: string): Observable<Userdto> {
    return this.http.get<Userdto>(`${this.userManagementUrl}/retrieve-user/${username}`).pipe(
      catchError(error => {
        console.error('Error retrieving user details:', error);
        throw new Error('Error retrieving user details');
      })
    );
  }

  private getUsername(): string {
    // Implement your logic to retrieve username here
    // For example, you can use sessionStorage.getItem('username')
    return 'username'; // Placeholder
  }


  generateQuestion(topic: string): Observable<QuestionDto> {
    return this.http.get<QuestionDto>(this.apiUrl + "/generateQuestion/" + topic + "/1")
      .pipe(
        catchError((error: any) => {
          console.error('An error occurred while retrieving bank accounts:', error);
          throw error;
        })
      );
  }


}

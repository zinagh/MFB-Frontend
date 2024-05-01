import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, switchMap } from 'rxjs';
import { BankAccountDto } from '../models/models/BankAccountDto';
import { Userdto } from '../models/models/Userdto';


@Injectable({
  providedIn: 'root'
})


export class BankaacountService {
  //private baseUrl : string = 'http://localhost:8181/E-Bank/';

  private apiUrl = 'http://localhost:8087/accountmanagement/bankaccount';
  private userManagementUrl = 'http://user-management/user/';

  constructor(private http : HttpClient) {}

  retrieveAllBankAccounts(): Observable<BankAccountDto[]> {
    return this.http.get<BankAccountDto[]>(`${this.apiUrl}/retrieveAllBankAccounts`).pipe(
      switchMap((bankAccounts: BankAccountDto[]) => {
        const observables: Observable<BankAccountDto>[] = [];
        for (const bankAccount of bankAccounts) {
          const userDtoObservable = this.retrieveUserDetails(bankAccount.titulaire);
          const bankAccountWithUser = userDtoObservable.pipe(
            map((userDto: Userdto) => {
              return { ...bankAccount, userDto };
            })
          );
          observables.push(bankAccountWithUser);
        }
        return forkJoin(observables);
      })
    );
  }

  //private retrieveUserDetails(username: string): Observable<Userdto> {
   // return this.http.get<Userdto>(`${this.apiUrl}/user/retrieve-user/${username}`);
  //}

  retrieveBankAccount(bankAccountId: string): Observable<BankAccountDto> {
    return this.http.get<BankAccountDto>(`${this.apiUrl}/retrieveBankAccount/${bankAccountId}`).pipe(
      catchError(error => {
        console.error('Error retrieving bank account:', error);
        throw new Error('Error retrieving bank account');
      })
    );
  }

  retrieveBankAccountByTitulaire(bankAccountTitulaire: string): Observable<BankAccountDto> {
    return this.http.get<BankAccountDto>(`${this.apiUrl}/retrieveBankAccountByTitulaire/${bankAccountTitulaire}`).pipe(
      catchError(error => {
        console.error('Error retrieving bank account by titulaire:', error);
        throw new Error('Error retrieving bank account by titulaire');
      })
    );
  }

  addBankAccount(bankAccountDto: BankAccountDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/addBankAccount`, bankAccountDto).pipe(
      catchError(error => {
        console.error('Error adding bank account:', error);
        throw new Error('Error adding bank account');
      })
    );
  }

  removeBankAccount(bankAccountId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/removeBankAccount/${bankAccountId}`).pipe(
      catchError(error => {
        console.error('Error removing bank account:', error);
        throw new Error('Error removing bank account');
      })
    );
  }

  modifyBankAccount(bankAccountDto: BankAccountDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/modifyBankAccount`, bankAccountDto).pipe(
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

  
 

}

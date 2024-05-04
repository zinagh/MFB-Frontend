import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Userdto } from '../models/Userdto';
import { BankAccountDto } from '../models/BankAccountDto';
import { KeycloakService } from 'keycloak-angular';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:9000/user' ;

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {}

  retrieveAllUsers(): Observable<Userdto[]> {
    return this.http.get<Userdto[]>(this.apiUrl + `/retrieve-all-users`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          return throwError(() => error);
        })
      );
  }

  addUser(userdto: Userdto): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/add-user', userdto)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  modifierUser(userdto: Userdto): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/modify-user', userdto)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  updatePassword(username: string, newpass: string, veripass: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('newpass', newpass)
      .set('veripass', veripass);

    return this.http.put<any>(this.apiUrl + `/updatepass`, null, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }

  retrieveUser(userName: string): Observable<Userdto> {
    return this.http.get<Userdto>(this.apiUrl + `/retrieve-user/${userName}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }

  removeUser(userName: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl +  `/remove-user/${userName}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }

  getPercentageOutgoingTransfers(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);

    return this.http.get<any>(`${this.apiUrl}/getPercentageOutgoingTransfers`, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }
 
  getAccountActivityRatio(account: any): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/getAccountActivityRatio`, account);
  }
  getAccountUtilizationRatio(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/getAccountUtilizationRatio`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
  }

}

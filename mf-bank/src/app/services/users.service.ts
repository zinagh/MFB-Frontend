import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Userdto } from '../models/Userdto';
import { BankAccountDto } from '../models/BankAccountDto';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:9000/user' ;
  constructor(private http: HttpClient) { }

  addUser(userdto: Userdto): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/adduserdto', userdto)
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


  retrieveAllUsers(): Observable<Userdto[]> {
    return this.http.get<Userdto[]>(this.apiUrl + `/retrieve-all-users`)
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
  getAccountActivityRatio(account: BankAccountDto, startDate: Date, endDate: Date): Observable<number> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    return this.http.get<number>(`${this.apiUrl}/getAccountActivityRatio`, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('An error occurred:', error);
          return throwError(error);
        })
      );
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { Userdto } from '../models/Userdto';
import { KeycloakService } from 'keycloak-angular';
import { throwError } from 'rxjs';
import { ModelInput } from '../models/ModelInput';
import { Article } from '../models/Article';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:9000/user' ;
  private apiUrlC ='http://localhost:9000/account';
  private apiUrlF = 'https://e6b3-35-232-227-2.ngrok-free.app';
  private apiUrlA = 'http://localhost:9002';

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


  retrieveAccountBalance(bankAccountTitulaire: string): Observable<number> {
    return this.http.get<number>(this.apiUrlC + `/getaccountbalancebyTitulaire/` + bankAccountTitulaire)
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

  getFeeIncomePerAccount(username: string): Observable<any> {
    const params = new HttpParams().set('username', username);

    return this.http.get<any>(`${this.apiUrl}/getFeeIncomePerAccount`, { params })
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
  }


predict(inputData: ModelInput): Observable<any> {
  return this.http.post<any>(this.apiUrlF + "/predict", inputData);
}



getNews(): Observable<Article[]> {
  const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '1');

  return this.http.get<Article[]>(this.apiUrlA + "/api/scrape_news", { headers });
}
}

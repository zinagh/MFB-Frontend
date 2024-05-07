import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionDto } from '../models/TransactionDto';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
  


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:9000/transactionmanagement/transactions';
  private userManagementUrl = 'http://localhost:9000/user';
  private tokenEndpoint = 'http://localhost:8181/realms/E-Bank/protocol/openid-connect/token';
clientCredentials = {
    grant_type: 'password',
    client_id: 'mfbank',
    username: 'rania',
    password: '1234'
  };
  constructor(private http: HttpClient) {}
  private bearer = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ4OFE0bFpkTVg1WVV0UklqVkJySDhlaVA0UldvZVc3dWZOTHN1VXhHOXZrIn0.eyJleHAiOjE3MTUxMDkyNTAsImlhdCI6MTcxNTEwODk1MCwianRpIjoiNWNjOTdmMWItNmM1MC00ZTUzLTk0MjAtOTEwNGU4ZGE3MTBmIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxL3JlYWxtcy9FLUJhbmsiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGFlZmVhNGEtYjRlMS00MTk1LTg1ZDktNzM4MTk0ZmUxNTAwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWZiYW5rIiwic2Vzc2lvbl9zdGF0ZSI6ImVjZWM5YmFiLTFiYTQtNDljYy1hN2Q3LWIyZTk4NWZiNmE1ZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MjAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJTVFVERU5UIiwiZGVmYXVsdC1yb2xlcy1lLWJhbmsiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiZWNlYzliYWItMWJhNC00OWNjLWE3ZDctYjJlOTg1ZmI2YTVlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoicmFuaWEgYm91YWNoaXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYW5pYSIsImdpdmVuX25hbWUiOiJyYW5pYSIsImZhbWlseV9uYW1lIjoiYm91YWNoaXIiLCJlbWFpbCI6InJhbmlhLmJvdWFjaGlyQGVzcHJpdC50biJ9.d6xpdzkWet_8H1mqvHkFNMnNhOpTs7d4sMnVwnSTMcAsqs-x2grOZxQwSL_PtAL2WHyee0Z8AOH3S6qAINyIGNtP8f7UvrkHtxANOYUoB2lhGIv4UbpVkKikHrrKIYOb_IRV4e7nrsvbOvFbh_MO51M7atm33D7hRJ8NJI4x8NEI-plm550oGgKpn5zCLFr_h9KSAUOek9Rg5hEiEZXcvZrRM8oLfbQuDV7F0wshQnPOQQ6KUP79O8xltNZiAgySjlIHaetaeRQKNaA_sTLou3XZ5YMrP5gBu6oJUNavMBGz6fcdxgF0qTiyD0BDsQX_I8je6QuI2EhRUgsKiPCsPA";
  addTransaction(transactionDto: TransactionDto): Observable<TransactionDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearer}`
      })
    };
  
    return this.http.post<TransactionDto>(`${this.apiUrl}/create`, transactionDto, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error adding transaction:', error);
          throw new Error('Error adding transaction');
        })
      );
  }
  getAllTransactions(): Observable<TransactionDto[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearer}`
      })
    };

    return this.http.get<TransactionDto[]>(`${this.apiUrl}/all`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error retrieving all transactions:', error);
          throw new Error('Error retrieving all transactions');
        })
      );
  }
  getTransactionById(transactionId: string): Observable<TransactionDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearer}`
      })
    };
    return this.http.get<TransactionDto>(`${this.apiUrl}/${transactionId}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error retrieving transaction by ID:', error);
          throw new Error('Error retrieving transaction by ID');
        })
      );
  }


  deleteTransaction(reference: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearer}`
      })
    };
  
    return this.http.delete<void>(`${this.apiUrl}/delete/${reference}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error deleting transaction:', error);
          throw new Error('Error deleting transaction');
        })
      );
  }
  

  modifyTransaction(transactionDto: TransactionDto): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearer}`
      })
    };
  
    // Utilisez la référence de la transaction dans l'URL
    const url = `${this.apiUrl}/update/${transactionDto.reference}`;
  
    return this.http.put<void>(url, transactionDto, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error modifying transaction:', error);
          throw new Error('Error modifying transaction');
        })
      );
  }
  
  
  
  
  

  searchTransactions(keyword: string): Observable<TransactionDto[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearer}`
      })
    };
    return this.http.get<TransactionDto[]>(`${this.apiUrl}/search?keyword=${keyword}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error searching transactions:', error);
          throw new Error('Error searching transactions');
        })
      );
  }
  
  

}
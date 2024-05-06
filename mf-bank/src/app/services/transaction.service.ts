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
  private bearer = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ4OFE0bFpkTVg1WVV0UklqVkJySDhlaVA0UldvZVc3dWZOTHN1VXhHOXZrIn0.eyJleHAiOjE3MTUwMzAxNTcsImlhdCI6MTcxNTAyOTg1NywianRpIjoiZTcyZGU3OGMtMTA5ZC00YmRhLWI4YTItYWVjMTNkMDAyYWFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxL3JlYWxtcy9FLUJhbmsiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGFlZmVhNGEtYjRlMS00MTk1LTg1ZDktNzM4MTk0ZmUxNTAwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWZiYW5rIiwic2Vzc2lvbl9zdGF0ZSI6IjZlZTI0YjQzLTVjZTMtNDg0Ni05MjNkLWE0OTVmMDBhNTQ1NyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MjAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJTVFVERU5UIiwiZGVmYXVsdC1yb2xlcy1lLWJhbmsiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiNmVlMjRiNDMtNWNlMy00ODQ2LTkyM2QtYTQ5NWYwMGE1NDU3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoicmFuaWEgYm91YWNoaXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYW5pYSIsImdpdmVuX25hbWUiOiJyYW5pYSIsImZhbWlseV9uYW1lIjoiYm91YWNoaXIiLCJlbWFpbCI6InJhbmlhLmJvdWFjaGlyQGVzcHJpdC50biJ9.fYvEKM2z7leKr94PtMsNNqmLo2gN2Br3P0cRpp0IlZoXmaA941ZKWDmLJiaavliZfBmzVxTK82H9m-cHKadeCGqGGyJFBw9zBmUgfOgrXELpTFQBv86LoGULxjnDmdX2RcvRfdgbDryoSvnDQjDqKJeWDUaUysTvkodQonT6-VMYFheBOg7OkSSS1a8Tx62wYyf0NELkRmpSJJ-RFfsGp3RsE4pydNNA5Tx_nlc5oRcV50gOZdjngnqY_XvVbYPlbfoQm9ymZFh_3vPOhYQMX7xqWU64079PjYrSHJGk0qoeQmCdYgVm-TLiZm4jDovuTJM6-0rV32G3_tU5Q8ctIw";  
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
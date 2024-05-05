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
  private bearer = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ4OFE0bFpkTVg1WVV0UklqVkJySDhlaVA0UldvZVc3dWZOTHN1VXhHOXZrIn0.eyJleHAiOjE3MTQ5MzkwMDcsImlhdCI6MTcxNDkzODcwNywianRpIjoiMjM2MGQ5NTgtOTdkYS00MTFlLTkyYjktOGQ5Njg2NWU5ZTEzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxL3JlYWxtcy9FLUJhbmsiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGFlZmVhNGEtYjRlMS00MTk1LTg1ZDktNzM4MTk0ZmUxNTAwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWZiYW5rIiwic2Vzc2lvbl9zdGF0ZSI6IjFjNzZjNGFjLTJhM2ItNDRmZS1iMDdmLWZhY2MzM2YyOGRkMyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MjAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJTVFVERU5UIiwiZGVmYXVsdC1yb2xlcy1lLWJhbmsiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMWM3NmM0YWMtMmEzYi00NGZlLWIwN2YtZmFjYzMzZjI4ZGQzIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoicmFuaWEgYm91YWNoaXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYW5pYSIsImdpdmVuX25hbWUiOiJyYW5pYSIsImZhbWlseV9uYW1lIjoiYm91YWNoaXIiLCJlbWFpbCI6InJhbmlhLmJvdWFjaGlyQGVzcHJpdC50biJ9.YtiEzBGcczounwItEl2OwTK9oUoeRMMWTfxxCaPSZDfojA647fggWzFceMBjSPJx3M3ELmk3PQDqV8s7w2WPvKK8EnHrC1rN97XE5a92Sn6BBFNuJQcsz5TjOGn21zlbmbLFE4A4GUyqh5KRCyfakNaNJ62hwc-080bRvo8frkri6VCfYlEcLrg0hdrxAHaqeWCwbqYVQ-5SwQ0dayieY3A1LNkp2rD1lEoF_z3sjscDYKrYcg3snmYmfNio957bsXAAXnsERavRpWmia8n5i2D8il0zKiVozohb0VMuMgX9IgIpuZATWshcYdFsPxwHhDf68W-O8nn54cNRePI7ZQ";  
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
    return this.http.get<TransactionDto>(`${this.apiUrl}/gettransaction/${transactionId}`)
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
  
    // Inclure l'ID de la transaction dans l'URL
    const url = `${this.apiUrl}/update/${transactionDto.reference}`;
  
    // Envoyer les données de la transaction dans la requête HTTP PUT
    return this.http.put<void>(url, transactionDto, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error modifying transaction:', error);
          throw new Error('Error modifying transaction');
        })
      );
  }
  

  searchTransactions(keyword: string): Observable<TransactionDto[]> {
    return this.http.get<TransactionDto[]>(`${this.apiUrl}/searchtransactions/${keyword}`)
      .pipe(
        catchError(error => {
          console.error('Error searching transactions:', error);
          throw new Error('Error searching transactions');
        })
      );
  }

}
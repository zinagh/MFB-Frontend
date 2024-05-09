import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { InternationalTransferDto } from '../models/InternationalTransferDto';

@Injectable({
  providedIn: 'root'
})
export class InternationalTransferService {
  readonly apiUrl = 'http://localhost:9000/account';
  private userManagementUrl = 'http://localhost:9000/user';

  constructor(private http : HttpClient) {}

  retrieveAllInternationalTransfers(): Observable<InternationalTransferDto[]> {
    return this.http.get<InternationalTransferDto[]>(this.apiUrl+ "/getallinternationaltransfers" ).pipe(
      catchError(error => {
        console.error('Error retrieving international transfers:', error);
        throw new Error('Error retrieving international transfers');
      })
    );
  }

  retrieveInternationalTransfer(internationalTransferId: number): Observable<InternationalTransferDto> {
    return this.http.get<InternationalTransferDto>(`${this.apiUrl}/${internationalTransferId}`).pipe(
      catchError(error => {
        console.error('Error retrieving international transfer:', error);
        throw new Error('Error retrieving international transfer');
      })
    );
  }

  addInternationalTransfer(internationalTransferDto: InternationalTransferDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/addinternationaltransfer`, internationalTransferDto).pipe(
      catchError(error => {
        console.error('Error adding international transfer:', error);
        throw new Error('Error adding international transfer');
      })
    );
  }

  approveInternationalTransfer(employeeApprovalUsername: string, id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/modify`, null, {
      params: {
        employeeApprovalUsername,
        id
      }
    }).pipe(
      catchError(error => {
        console.error('Error approving international transfer:', error);
        throw new Error('Error approving international transfer');
      })
    );
  }


  removeInternationalTransfer(internationalTransferId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteinternationaltransferby/${internationalTransferId}`).pipe(
      catchError(error => {
        console.error('Error removing international transfer:', error);
        throw new Error('Error removing international transfer');
      })
    );
  }

  modifyInternationalTransfer(internationalTransferDto: InternationalTransferDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, internationalTransferDto).pipe(
      catchError(error => {
        console.error('Error modifying international transfer:', error);
        throw new Error('Error modifying international transfer');
      })
    );
  }

  getStatisticsForChart(bankAccountId: string, month: number): Observable<number[]> {
    // Constructing params object
    const params = new HttpParams()
      .set('bankAccountId', bankAccountId)
      .set('month', month.toString());

    return this.http.get<number[]>(`${this.apiUrl}/statisics`, { params }).pipe(
      catchError(error => {
        console.error('Error fetching statistics for chart:', error);
        throw new Error('Error fetching statistics for chart');
      })
    );
  }



  retrieveAllInternationalTransfersByTitulaireAccount(username: string): Observable<InternationalTransferDto[]> {
    return this.http.get<InternationalTransferDto[]>(this.apiUrl+ "/retrieveAllInternationalTransfersByTitulaireAccount/" + username ).pipe(
      catchError(error => {
        console.error('Error retrieving international transfers:', error);
        throw new Error('Error retrieving international transfers');
      })
    );
  }

}

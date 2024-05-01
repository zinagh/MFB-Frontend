import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { InternationalTransferDto } from '../models/models/InternationalTransferDto';

@Injectable({
  providedIn: 'root'
})
export class InternationalTransferService {
  private apiUrl = 'http://localhost:8087/accountmanagement/internationaltransfers';

  constructor(private http : HttpClient) {}

  retrieveAllInternationalTransfers(): Observable<InternationalTransferDto[]> {
    return this.http.get<InternationalTransferDto[]>(`${this.apiUrl}`).pipe(
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
    return this.http.post<void>(`${this.apiUrl}`, internationalTransferDto).pipe(
      catchError(error => {
        console.error('Error adding international transfer:', error);
        throw new Error('Error adding international transfer');
      })
    );
  }

  approveInternationalTransfer(employeeApprovalUsername: string, id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve/${id}`, { employeeApprovalUsername }).pipe(
      catchError(error => {
        console.error('Error approving international transfer:', error);
        throw new Error('Error approving international transfer');
      })
    );
  }

  removeInternationalTransfer(internationalTransferId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${internationalTransferId}`).pipe(
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


}

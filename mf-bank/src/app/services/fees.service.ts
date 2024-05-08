import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { FeeDto } from '../models/models/FeeDto';
//import { FeeType } from "./FeeType";

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  private apiUrl = 'http://localhost:8087/accountmanagement/fees';

 constructor(private http : HttpClient) {}

 retrieveAllFees(): Observable<FeeDto[]> {
  return this.http.get<FeeDto[]>(`${this.apiUrl}`).pipe(
    catchError(error => {
      console.error('Error retrieving fees:', error);
      throw new Error('Error retrieving fees');
    })
  );
}

retrieveFee(feeId: number): Observable<FeeDto> {
  return this.http.get<FeeDto>(`${this.apiUrl}/${feeId}`).pipe(
    catchError(error => {
      console.error('Error retrieving fee:', error);
      throw new Error('Error retrieving fee');
    })
  );
}

addFee(feeDto: FeeDto): Observable<void> {
  let amountPercent = 0;
  switch (feeDto.feeType) {
    case 'TRANSACTION_FEE_currentAccount':
      amountPercent = 4;
      break;
    case 'TRANSACTION_FEE_savingsAccount':
      amountPercent = 2;
      break;
    case 'CURRENCY_CONVERSION_FEE':
      amountPercent = 6;
      break;
    default:
      break;
  }
  feeDto.amountPercent = amountPercent;
  return this.http.post<void>(`${this.apiUrl}`, feeDto).pipe(
    catchError(error => {
      console.error('Error adding fee:', error);
      throw new Error('Error adding fee');
    })
  );
}

removeFee(feeId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${feeId}`).pipe(
    catchError(error => {
      console.error('Error removing fee:', error);
      throw new Error('Error removing fee');
    })
  );
}

modifyFee(feeDto: FeeDto): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}`, feeDto).pipe(
    catchError(error => {
      console.error('Error modifying fee:', error);
      throw new Error('Error modifying fee');
    })
  );
}
}

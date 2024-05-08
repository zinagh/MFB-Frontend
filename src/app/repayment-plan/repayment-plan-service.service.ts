import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators'; // Import de 'tap'

@Injectable({
  providedIn: 'root'
})
export class RepaymentPlanServiceService {
  private baseUrl = "http://localhost:8088/creditDB/repayment-plan";

  constructor(private http: HttpClient) { }

  exportRepaymentPlanToExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/exportRepaymentPlanDetailsToExcel`, { responseType: 'blob' })
      .pipe(
        catchError(error => {
          console.error('Error exporting Excel', error);
          // Throw a new error with a more descriptive message
          return throwError(() => new Error('Failed to export Excel due to server error'));
        })
      );
  }

  getRepaymentPlans(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      tap(data => console.log('Repayment plans received:', data)), // Ajoutez ce log pour voir les données reçues
      catchError(error => {
        console.error('Error getting repayment plans', error);
        return throwError(() => new Error('Failed to get repayment plans due to server error'));
      })
    );
  }

  getRepaymentPlanById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/repaymentplans/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Ensure HttpParams is imported
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'})
export class RepaymentServiceService {
  private apiUrl = 'http://localhost:8088/creditDB/repayment-plan';

  constructor(private http: HttpClient) { }

  calculateRepaymentPlans(data: any): Observable<any> {
    // Correctly initialize HttpParams
    let params = new HttpParams()
      .set('creditAmount', data.creditAmount.toString()) // Ensure the values are converted to strings if needed
      .set('annualInterestRate', data.annualInterestRate.toString())
      .set('creditDurationInYears', data.creditDurationInYears.toString())
      .set('creditStartDate', data.creditStartDate);

    // Passing parameters correctly in the http.post method
    return this.http.post(`${this.apiUrl}/calculateRepaymentPlans`, null, { params: params });
  }
}

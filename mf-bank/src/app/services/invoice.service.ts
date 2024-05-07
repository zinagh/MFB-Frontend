import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:9000/transactionmanagement/invoices';
  private bearer ="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ4OFE0bFpkTVg1WVV0UklqVkJySDhlaVA0UldvZVc3dWZOTHN1VXhHOXZrIn0.eyJleHAiOjE3MTUxMDgyNDAsImlhdCI6MTcxNTEwNzk0MCwianRpIjoiNDRjZDRkZDktYTc4YS00YTFkLTgyMWUtOGU2MDNkYjVlMjJkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgxL3JlYWxtcy9FLUJhbmsiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZGFlZmVhNGEtYjRlMS00MTk1LTg1ZDktNzM4MTk0ZmUxNTAwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibWZiYW5rIiwic2Vzc2lvbl9zdGF0ZSI6IjBlMDMzZGI1LTMxNjgtNDg3Zi05NzZjLTZlMDI1NGE2MWQ1MSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MjAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJTVFVERU5UIiwiZGVmYXVsdC1yb2xlcy1lLWJhbmsiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMGUwMzNkYjUtMzE2OC00ODdmLTk3NmMtNmUwMjU0YTYxZDUxIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoicmFuaWEgYm91YWNoaXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYW5pYSIsImdpdmVuX25hbWUiOiJyYW5pYSIsImZhbWlseV9uYW1lIjoiYm91YWNoaXIiLCJlbWFpbCI6InJhbmlhLmJvdWFjaGlyQGVzcHJpdC50biJ9.biiwAFDIZrc2JiSnrlnDcpKiBOrbzAUITv9XU6OzgVXlcpZbuF07drLgIyFgluYnQe1QVc_Qpasbjiv-cBx-oTEu2byJul6KczgaAXdl8wqVuCLkPDuS5PxiNXcDhulxYxOt0I2iha-1XFWZBDGmwmhyZN_k4TBpJemDrqfVLqMexURkmrOeixCI1v_ibbrIfZVNpa0wQsAf5IugM-2GWrPdHBAoaVJh71KA1V37sXKBeUL4p-BSgE44ay_s3fo6qCXmURV6evWLR1zWvDAguFeJCPAmLVIhyOiBdR3-cH-lobOScrAHsaLzV81TKQtyPsSTfppvYGpaiZnfSMDaDw"
  constructor(private http: HttpClient) {}

  getTotalAmountByMonth(year: number, monthName: string): Observable<number> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.bearer}`
      })
    };

    return this.http.get<number>(`${this.apiUrl}/total-amount-by-month?year=${year}&month=${monthName}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error retrieving total amount by month:', error);
          throw new Error('Error retrieving total amount by month');
        })
      );
  }

  private mapMonthNumberToName(monthNumber: number): string {
    const monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return monthNames[monthNumber - 1]; // Les indices commencent à 0, donc soustrayez 1
  }
}

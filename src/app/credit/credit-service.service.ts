import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  fetchAllContracts(): Observable<any[]> {
    throw new Error('Method not implemented.');
  }
  // Méthode pour gérer les erreurs de requête HTTP

  private baseUrl = 'http://localhost:8088/creditDB/credit'; // URL de base de l'API REST
  getCreditById(creditId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${creditId}`);
  }
  constructor(private http: HttpClient) { }

  // Méthode pour créer un crédit
  createCredit(creditDto: any): Observable<string> {
    const params = new HttpParams()
      .set('firstname', creditDto.firstname)
      .set('lastname', creditDto.lastname)
      .set('location', creditDto.location);

    return this.http.post(`${this.baseUrl}/create`, creditDto, { params, responseType: 'text' });
  }


  // Méthode pour gérer les erreurs de requête HTTP
  private handleError(err: any, caught: Observable<any>): Observable<any> {
    console.error('An error occurred:', err); // Log de l'erreur dans la console
    return throwError(err); // Renvoyer l'erreur pour que le composant puisse la gérer
  }

  getAllCredits(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCredit(creditId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${creditId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  modifyCredit(id: number, creditDto: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifycredit/${id}`, creditDto)
      .pipe(
        catchError(this.handleError)
      );
  }

  downloadCreditPDF(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/credit/pdf`, { responseType: 'blob' });

  }

  searchContractByAttribute(attributeName: string, attributeValue: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8088/creditDB/contract/search`, {
      params: {
        attributeName: attributeName,
        attributeValue: attributeValue
      }
    }).pipe(
      catchError(this.handleError)
    );
  }
  getCreditCountByTypeChart(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/credit-count-by-type-chart`, { responseType: 'blob' });  }
    
  
  }
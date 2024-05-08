import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl = 'http://localhost:8088/creditDB';

  constructor(private http: HttpClient) {}

  fetchAllContracts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/contract/all`);
  }
}
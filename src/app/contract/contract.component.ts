import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreditService } from 'src/app/credit/credit-service.service';
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  contracts: any = [];
  attributeName: string = '';
  attributeValue: string = '';

  constructor(private http: HttpClient,private creditService: CreditService) {}

  ngOnInit(): void {
    this.fetchContracts();
  }

  fetchContracts() {
    this.http.get<any[]>('http://localhost:8088/creditDB/contract/all').subscribe(data => {
      this.contracts = data;
    });
  }


  searchContract(): void {
    this.creditService.searchContractByAttribute(this.attributeName, this.attributeValue)
      .subscribe({
        next: (contract) => {
          console.log(contract)
          this.contracts = contract;
        },
        error: (error) => {
          this.contracts = null;
        }
      });
  }
}

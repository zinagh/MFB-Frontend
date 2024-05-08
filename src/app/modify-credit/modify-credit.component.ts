import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditService } from 'src/app/credit/credit-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modify-credit',
  templateUrl: './modify-credit.component.html',
  styleUrls: ['./modify-credit.component.css']
})
export class ModifyCreditComponent implements OnInit {
  creditToModify: any = {};
  creditId: any;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private creditService: CreditService,
    private http: HttpClient // Inject HttpClient
  ) { }

  ngOnInit() {
    const creditId = +this.route.snapshot.params['id'];
    if (creditId) {
      this.creditId = creditId;
      this.loadCreditDetails(creditId);
    }
  }

  loadCreditDetails(creditId: number) {
    this.creditService.getCreditById(creditId).subscribe(
      (creditData: any) => {
        this.creditToModify = creditData; // Assigner les données du crédit à modifier à creditToModify
      },
      (error: any) => {
        console.error('Error retrieving credit details:', error);
      }
    );
  }

  modifyCredit() {
    if (this.creditId) {
      const url = 'http://localhost:8088/creditDB/credit/modifycredit'; // URL of the endpoint
  
      // Append the id to the creditToModify object
      this.creditToModify.id = this.creditId;
  
      this.http.put(url, this.creditToModify).subscribe(
        () => {
          console.log('Credit modified successfully');
          this.router.navigate(['/AffichageCredit']); // Redirect to AffichageCredit after modification
        },
        (error: any) => {
          console.error('Error modifying credit:', error);
        }
      );
    } else {
      console.error("Unable to modify credit because the identifier is undefined.");
    }
  }
  
}

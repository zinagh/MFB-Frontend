import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditService } from 'src/app/credit/credit-service.service';
import { map } from 'rxjs/operators'; // Importer map depuis 'rxjs/operators'

@Component({
  selector: 'app-affichage',
  templateUrl: './affichage.component.html',
  styleUrls: ['./affichage.component.css']
})
export class AffichageComponent {
  credits$!: Observable<any[]>;
  qrCodeLink: string | null = null;
  // Propriétés pour la suppression
  creditIdToDelete: number | null = null;

  // Propriétés pour la modification
  creditToModify: any = null;

  constructor(private creditService: CreditService) {}
  pdfDownloadLink: string | null = null; 
  ngOnInit() {
    this.loadCredits();
  }

  loadCredits() {
    this.credits$ = this.creditService.getAllCredits();
  }

  deleteCreditConfirmation(creditId: number) {
    // Appeler la fonction de suppression directement sans afficher la confirmation
    this.deleteCredit(creditId);
    this.credits$ = this.creditService.getAllCredits();
  }

  deleteCredit(creditId: number) {
    if (creditId !== null) {
      // Appeler le service de suppression de crédit
      this.creditService.deleteCredit(creditId)
        .subscribe(
          () => {
            console.log('Credit deleted successfully');
            // Ne pas recharger la liste des crédits après la suppression
          },
          (error: any) => {
            console.error('Error deleting credit:', error);
          }
        );
    }
  }

  selectCreditToModify(credit: any) {
    this.creditToModify = { ...credit };
  }

  modifyCredit() {
    if (this.creditToModify !== null) {
      this.creditService.modifyCredit(this.creditToModify.id, this.creditToModify).subscribe(
        () => {
          console.log('Credit modified successfully');
          this.creditToModify = null;
          this.loadCredits(); // Recharger la liste des crédits après la modification
        },
        (error: any) => {
          console.error('Error modifying credit:', error);
        }
      );
    }
  }
  downloadPDF(): void {
    this.creditService.downloadCreditPDF().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        this.pdfDownloadLink = url;
        this.qrCodeLink = url; // Ensure the QR code link is the same as the PDF download link
      },
      (error: any) => {
        console.error('Error downloading PDF:', error);
      }
    );
  }
  filterCreditsByStatus(status: string) {
    this.creditService.getAllCredits().pipe(
      map((credits: any[]) => {
        console.log('Filtering for status:', status); // Log status being filtered
        const filtered = credits.filter(credit => credit.status.toLowerCase() === status.toLowerCase());
        console.log('Filtered Credits:', filtered); // Log filtered list
        return filtered;
      })
    ).subscribe(filteredCredits => this.credits$ = new Observable(observer => observer.next(filteredCredits)));
  }
}
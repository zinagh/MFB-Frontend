import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CreditService } from '../credit/credit-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.css']
})
export class AddCreditComponent implements OnInit {
  constructor(private creditService: CreditService, private router: Router) { }

  showError: boolean = false;
  navigateToUsers() {
    this.router.navigate(['/Credit']);
  }

  creditType: string | null = null;
  creditStatus: string | null = null;
  creditAmount: number | null = null;
  creditDuration: number | null = null;
  firstname: string | null = null;
  lastname: string | null = null;
  location: string | null = null;
  credits$!: Observable<any[]>;

  // Définir les valeurs pour les types de crédit et les statuts de crédit
  creditTypes: string[] = ['ACCOMMODATION', 'LEISURE', 'STUDY', 'TRAVEL', 'LANGUAGE', 'TRAINING'];
  creditStatuses: string[] = ['APPROVED', 'REJECTED', 'PENDING'];

  ngOnInit() { }

  submitForm() {
    if (!this.creditType || !this.creditStatus || !this.creditAmount || !this.creditDuration || !this.firstname || !this.lastname || !this.location) {
      // Afficher une alerte si un champ requis est vide
      Swal.fire({
        title: "Erreur",
        text: "Veuillez remplir tous les champs.",
        icon: "error"
      });
      return;
    }

    const creditDto = {
      creditType: this.creditType,
      creditStatus: this.creditStatus,
      creditAmount: this.creditAmount,
      creditDuration: this.creditDuration,
      firstname: this.firstname,
      lastname: this.lastname,
      location: this.location
    };

    this.creditService.createCredit(creditDto).subscribe(
      () => {
        console.log('Credit creation successful');
        this.resetForm();
        Swal.fire({
          title: "Succès!",
          text: "Le crédit a été créé avec succès!",
          icon: "success"
        });
      },
      (error: any) => {
        console.error('Error creating credit:', error);
        // Handle errors here
        Swal.fire({
          title: "Erreur",
          text: "Une erreur est survenue lors de la création du crédit.",
          icon: "error"
        });
      }
    );
  }

  resetForm() {
    // Reset all form fields
    this.creditType = null;
    this.creditStatus = null;
    this.creditAmount = null;
    this.creditDuration = null;
    this.firstname = null;
    this.lastname = null;
    this.location = null;
    this.showError = false;
  }
}

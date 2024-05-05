import { Component } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { TransactionDto } from '../models/TransactionDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {
  transactionForm!: FormGroup;

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder, private router: Router) {
    this.transactionForm = this.formBuilder.group({
      reference: ['', Validators.required], // Champ de référence avec validation requise
      montant: ['', Validators.required], // Champ de montant avec validation requise
      // date_heure: ['', Validators.required], // Champ de date_heure avec validation requise
      type: ['', Validators.required], // Champ de type avec validation requise
      description: [''], // Champ de description
      validation: [false], // Champ de validation avec valeur par défaut
      cancelBysender: [false], // Champ de cancelBysender avec valeur par défaut
      cancelByreceiver: [false], // Champ de cancelByreceiver avec valeur par défaut
      destination: ['', Validators.required], // Champ de destination avec validation requise
      source: ['', Validators.required] // Champ de source avec validation requise
      // Vous pouvez ajouter d'autres champs et validateurs ici
    });
  }

  addTransaction(): void {
    if (this.transactionForm.valid) { // Vérifier si le formulaire est valide avant d'ajouter la transaction
      const transactionData: TransactionDto = this.transactionForm.value;
      this.transactionService.addTransaction(transactionData).subscribe(
        (response) => {
          console.log('Transaction added successfully:', response);
          this.transactionForm.reset();
          // Rediriger vers une autre page après l'ajout de la transaction
          this.router.navigate(['/transactions']);
        },
        (error) => {
          console.error('Failed to add transaction:', error);
        }
      );
    } else {
      console.error('Invalid transaction form data.'); // Gérer les erreurs de validation
      console.log(this.transactionForm); // Gérer les erreurs de validation
    }
  }
}

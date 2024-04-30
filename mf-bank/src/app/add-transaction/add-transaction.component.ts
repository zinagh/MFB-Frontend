
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {

  constructor() { }

  addTransaction() {
    // Ajoutez ici la logique pour gérer l'ajout de la transaction
    console.log('Transaction added!');
  }

}

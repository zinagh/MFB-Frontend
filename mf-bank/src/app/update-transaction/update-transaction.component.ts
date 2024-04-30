import { Component } from '@angular/core';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css']
})
export class UpdateTransactionComponent {

  constructor() { }

  updateTransaction() {
    // Ajoutez ici la logique pour gérer l'update de la transaction
    console.log('Transaction updated!');
  }

}

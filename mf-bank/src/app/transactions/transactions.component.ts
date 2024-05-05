import { Component, OnInit } from '@angular/core';
import { TransactionDto } from '../models/TransactionDto';
import { TransactionService } from '../services/transaction.service'; // Assurez-vous que le chemin d'import est correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private transactionService: TransactionService, private router: Router) { }

  transactionsList: TransactionDto[] = [];
  inputValue: string = '';
  debounceTimer: any;
  isSpecificTransaction: boolean = false;

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
    this.isSpecificTransaction = !!this.inputValue;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
   /* this.debounceTimer = setTimeout(() => {
      this.loadTransactionsByTitulaire(this.inputValue);
    }, 2000);*/
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  
  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(data => {
      this.transactionsList = data;
      console.log(this.transactionsList);
    });
  }
  searchTransactions(): void {
    if (this.inputValue.trim() !== '') {
      this.transactionService.searchTransactions(this.inputValue).subscribe(data => {
        this.transactionsList = data;
      });
    } else {
      this.loadTransactions();
    }
  }
  



  loadTransactionsByTitulaire(name: string): void {
    this.transactionService.searchTransactions(name).subscribe(data => {
      this.transactionsList = data;
      console.log(this.transactionsList);
    });
  }

  confirmDelete(reference: string | undefined): void {
    console.log('Reference:', reference); // Ajoutez ce console.log pour vérifier la référence
    
    if (!reference) {
      console.error('Reference is undefined');
      return;
    }
  
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.removeTransaction(reference);
      this.transactionsList.filter(x=>x.reference!=reference);
      this.loadTransactions();
    }
  }
  
  
  removeTransaction(reference: string): void {
    this.transactionService.deleteTransaction(reference).subscribe(
      () => {
        console.log('Transaction removed successfully');
        this.loadTransactions();
      },
      (error: any) => { // Spécifiez explicitement le type de 'error' comme 'any'
        console.error('Failed to remove transaction:', error);
      }
    );
  }
  
}

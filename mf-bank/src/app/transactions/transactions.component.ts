import { Component, OnInit } from '@angular/core';
import { TransactionDto } from '../models/TransactionDto';
import { TransactionService } from '../services/transaction.service'; // Assurez-vous que le chemin d'import est correct
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
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
        // Filtrer les transactions en fonction du mot-clé
        this.transactionsList = data.filter(transaction =>
          transaction.reference.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          transaction.destination.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          transaction.source.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          transaction.type.toLowerCase().includes(this.inputValue.toLowerCase()) ||
          transaction.description.toLowerCase().includes(this.inputValue.toLowerCase())
        );
      });
    } else {
      this.loadTransactions(); // Si le champ de recherche est vide, chargez toutes les transactions
    }
  }
  
  
  generateExcel(): void {
    // Créer un tableau de données à partir des transactions
    const data: any[] = this.transactionsList.map(transaction => ({
      Reference: transaction.reference,
      Destination: transaction.destination,
      Source: transaction.source,
      Montant: transaction.montant,
      DateHeure: transaction.date_heure,
      Type: transaction.type,
      Description: transaction.description,
      Validation: transaction.validation,
      CancelByReceiver: transaction.cancelByreceiver,
      CancelBySender: transaction.cancelBysender
    }));

    // Convertir le tableau de données en feuille de calcul Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Créer le classeur Excel
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };

    // Générer le fichier Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Télécharger le fichier Excel
    this.saveAsExcelFile(excelBuffer, 'transactions');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    const url: string = window.URL.createObjectURL(data);
    downloadLink.href = url;
    downloadLink.download = fileName + '.xlsx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
  generatePDF(transaction: TransactionDto): void {
    // Création d'une instance de jsPDF
    const doc = new jsPDF();

    // Génération du contenu du PDF à partir des informations de la transaction
    const content = `
      Reference: ${transaction.reference}
      Destination: ${transaction.destination}
      Source: ${transaction.source}
      Montant: ${transaction.montant}
      Date-Heure: ${transaction.date_heure}
      Type: ${transaction.type}
      Description: ${transaction.description}
      Validation: ${transaction.validation}
      CancelByreceiver: ${transaction.cancelByreceiver}
      CancelBysender: ${transaction.cancelBysender}
    `;

    // Ajout du contenu au PDF
    doc.text(content, 10, 10);

    // Génération du fichier PDF
    const fileName = 'transaction.pdf';
    doc.save(fileName);

    // Ouvrir le fichier PDF dans un nouvel onglet
    window.open(doc.output('bloburl'), '_blank');
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

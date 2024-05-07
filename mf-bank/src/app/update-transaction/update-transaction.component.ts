import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { TransactionDto } from '../models/TransactionDto';


@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css']
})
export class UpdateTransactionComponent implements OnInit {
  transactionForm!: FormGroup;
  transactionId: string = '';
  transactionData: TransactionDto | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.transactionId = this.route.snapshot.paramMap.get('id') || '';
    this.loadTransactionData();
  }

  loadTransactionData(): void {
    this.transactionService.getTransactionById(this.transactionId).subscribe(
      (data) => {
        console.log(data);
        this.transactionData = data;
        this.initFormWithData();
      },
      (error) => {
        console.error('Failed to fetch transaction details:', error);
        // Gérer l'erreur ici
      }
    );
  }

  initFormWithData(): void {
    this.transactionForm = this.formBuilder.group({
      reference: [this.transactionData?.reference || '', Validators.required],
      montant: [this.transactionData?.montant || '', Validators.required],
      type: [this.transactionData?.type || '', Validators.required],
      description: [this.transactionData?.description || ''],
      validation: [this.transactionData?.validation || false],
      cancelBysender: [this.transactionData?.cancelBysender || false],
      cancelByreceiver: [this.transactionData?.cancelByreceiver || false],
      destination: [this.transactionData?.destination || '', Validators.required],
      source: [this.transactionData?.source || '', Validators.required]
    });
  }

  modifyTransaction(): void {
    if (this.transactionForm.valid && this.transactionData) {
      const updatedTransactionData: TransactionDto = this.transactionForm.value;
      updatedTransactionData.reference = this.transactionData.reference;

      this.transactionService.modifyTransaction(updatedTransactionData).subscribe(
        (response) => {
          console.log('Transaction updated successfully:', response);
          this.router.navigate(['/transactions']);
        },
        (error) => {
          console.error('Failed to update transaction:', error);
        }
      );
    } else {
      console.error('Invalid transaction form data.');
      console.log(this.transactionForm);
    }
  }
}

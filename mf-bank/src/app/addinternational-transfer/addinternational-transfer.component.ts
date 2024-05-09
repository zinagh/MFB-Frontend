import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InternationalTransferDto } from '../models/InternationalTransferDto';
import { InternationalTransferService } from '../services/international-transfer.service';
import { validateamount } from '../shared/validators';

@Component({
  selector: 'app-addinternational-transfer',
  templateUrl: './addinternational-transfer.component.html',
  styleUrls: ['./addinternational-transfer.component.css']
})
export class AddinternationalTransferComponent implements OnInit {
  approval: boolean = false;
  internationaltransferDto: InternationalTransferDto = {} as InternationalTransferDto;

  constructor(private Router: Router , private formBuilder: FormBuilder ,  private trasnferservice: InternationalTransferService ){}


  navigateTointernationaltransfer(){
    this.Router.navigate(['/internationaltransfer']);
  }

  transferForm!: FormGroup;


 ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      bankAccountToMakeTransfert:['', Validators.required],
      sendOrReceive: false,
      objectofTransaction: [''],
      amount: ['', validateamount],
      currencyCode: ['', Validators.required]
    });
    const amountControl = this.transferForm.get('amount');
    if (amountControl) {
      amountControl.setValidators(this.validateamount);
    }

    this.transferForm.get('amount')?.setValidators(this.validateamount);

  }
  onSubmit(): void {
    const transfer: InternationalTransferDto = this.transferForm.value;
console.log(this.transferForm.value);
console.log(this.transferForm.get('bankAccountToMakeTransfert')?.value);

    if (this.transferForm.valid) {
      const date = new Date();
      const transfer: InternationalTransferDto = this.transferForm.value;
      transfer.status = "Pending";
      transfer.date = date;
      console.log(this.transferForm.value);

      this.trasnferservice.addInternationalTransfer(transfer).subscribe(
        (response) => {
          console.log('transfer added successfully:', response);
          this.transferForm.reset();
          this.navigateTointernationaltransfer();
        },
        (error) => {
          console.error('Failed to add transfer:', error);
        }
      );
    } else {
      this.transferForm.markAllAsTouched();
    } 
  }
  validateamount(control: AbstractControl): ValidationErrors | null {
    const amount = control.value;
    if (amount !== null && amount < 0) {
      return { negativeamount: true };
    }
    return null;
  }

}

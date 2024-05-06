import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InternationalTransferDto } from '../models/InternationalTransferDto';
import { InternationalTransferService } from '../services/international-transfer.service';

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
      bankAccountToMakeTransfert:['Choose a Bank Account'],
      sendOrReceive: [''],
      objectofTransaction: [''],
      amount: ['', Validators.required],
      currencyCode: ['', Validators.required]
    });
    
  }
  onSubmit(): void {
    if (this.transferForm.valid) {
      const date = new Date();
      const transfer: InternationalTransferDto = this.transferForm.value;  
      transfer.status = "Pending";
      transfer.date = date;
      console.log(transfer);
      
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


}

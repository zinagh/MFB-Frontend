import { Component, OnInit } from '@angular/core';
import { InternationalTransferService } from '../services/international-transfer.service';
import { Router } from '@angular/router';
import { InternationalTransferDto } from '../models/InternationalTransferDto';

@Component({
  selector: 'app-international-transfer',
  templateUrl: './international-transfer.component.html',
  styleUrls: ['./international-transfer.component.css']
})
export class InternationalTransferComponent implements OnInit {
  id!: number;
  employeeApprovalUsername!: string ;
  
  constructor(private internationaltransferservice: InternationalTransferService  , private router: Router){}
  internationaltransfers: InternationalTransferDto[] = [];

  approveTransfer(employeeApprovalUsername: string ,id: number) {
    this.internationaltransferservice.approveInternationalTransfer(employeeApprovalUsername ,id)
      .subscribe(() => {
        console.log('Transfer approved successfully');
        this.loadinternationaltransfers();
      }, error => {
        console.error('Error approving transfer:', error);
      });
  }
  handleButtonClick(internationaltransfer: any) {
    
   console.log('Button clicked!');
  }
  
  ngOnInit() :void {
    this.loadinternationaltransfers();

  }
  
  internationaltransfer!: InternationalTransferDto;
  loadinternationaltransfers() :void {
    this.internationaltransferservice.retrieveAllInternationalTransfers().subscribe(data  => {
     this.internationaltransfers = data;
     console.log(this.internationaltransfers);
    });
}
confirmDelete(id: number | undefined): void {
  if (confirm('Are you sure you want to delete this bank account?')) {
      if(id){
        console.log(id)
      this.removeInternationalTransfer(id);
      }
  }
}

removeInternationalTransfer(id: number): void {
  this.internationaltransferservice.removeInternationalTransfer(id).subscribe(
    () => {
      console.log('User removed successfully');
      this.loadinternationaltransfers();
    },
    (error) => {
      console.error('Failed to remove user:', error);
    }
  );
}

}

import { Component, OnInit } from '@angular/core';
import { InternationalTransferService } from '../services/international-transfer.service';
import { Router } from '@angular/router';
import { InternationalTransferDto } from '../models/InternationalTransferDto';
import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-international-transfer',
  templateUrl: './international-transfer.component.html',
  styleUrls: ['./international-transfer.component.css']
})
export class InternationalTransferComponent implements OnInit {
  id!: number;
  isEmployee: boolean = this.securityService.hasRoleIn(['EMPLOYEE']);

  constructor(public securityService: SecurityService ,
    private internationaltransferservice: InternationalTransferService  , private router: Router){}
  internationaltransfers: InternationalTransferDto[] = [];

  approveTransfer(employeeApprovalUsername: string ,id: number) {
    if (this.isEmployee && this.securityService.profile?.username !== undefined) {
      employeeApprovalUsername = this.securityService.profile.username!;
    }
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
    if(this.isEmployee){
    this.loadinternationaltransfers();
    } else if(this.securityService.profile?.username !== undefined) {
      this.loadinternationaltransfersByusername(this.securityService.profile?.username);
    }

  }

  internationaltransfer!: InternationalTransferDto;
  loadinternationaltransfers() :void {
    this.internationaltransferservice.retrieveAllInternationalTransfers().subscribe(data  => {
     this.internationaltransfers = data;
    });
}

loadinternationaltransfersByusername(username: string) :void {
  this.internationaltransferservice.
  retrieveAllInternationalTransfersByTitulaireAccount(username).subscribe(data  => {
   this.internationaltransfers = data;
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

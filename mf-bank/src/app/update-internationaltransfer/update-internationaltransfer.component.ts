import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-internationaltransfer',
  templateUrl: './update-internationaltransfer.component.html',
  styleUrls: ['./update-internationaltransfer.component.css']
})
export class UpdateInternationaltransferComponent {
  constructor(private router: Router ){}
  navigateToupdateIT(){
    this.router.navigate(['/internationaltransfermanagement']);
  }

}

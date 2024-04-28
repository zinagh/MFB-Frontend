import { Component } from '@angular/core';

@Component({
  selector: 'app-international-transfer',
  templateUrl: './international-transfer.component.html',
  styleUrls: ['./international-transfer.component.css']
})
export class InternationalTransferComponent {
  approval: boolean = false;
  handleButtonClick() {
    
    console.log('Button clicked!');
  }
}

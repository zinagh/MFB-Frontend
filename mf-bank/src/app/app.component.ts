import { Component, OnInit } from '@angular/core';
import { BankaacountService } from './services/bankaacount.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mf-bank';
  
  constructor(private bankaacountService: BankaacountService) {
    
  }
 
  
}

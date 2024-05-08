import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CreditService } from 'src/app/credit/credit-service.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent {
  imageUrl: SafeUrl | null = null;

  constructor(
    private creditService: CreditService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart(): void {
    this.creditService.getCreditCountByTypeChart().subscribe({
      next: (blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (error) => console.error('Failed to load chart:', error),
      complete: () => console.log('Chart load complete')
    });
  }

}

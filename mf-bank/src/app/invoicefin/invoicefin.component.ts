import { Component } from '@angular/core';
import { InvoiceService } from '../services/invoice.service'; // Importez le service InvoiceService
import Chart from 'chart.js/auto';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-invoicefin',
  templateUrl: './invoicefin.component.html',
  styleUrls: ['./invoicefin.component.css']
})
export class InvoicefinComponent implements AfterViewInit {
  @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
  chart: Chart = {} as Chart;
  years: number[] = Array.from({ length: new Date().getFullYear() - 1996 }, (_, index) => 1997 + index);
  months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  selectedYear: number = 0;
  selectedMonth: string | null = null; 
  totalAmount: number = 0; 
  totalAmounts: number[] = [];

  constructor(private invoiceService: InvoiceService) {} // Injection du service InvoiceService
  ngAfterViewInit(): void {
    this.createChart();
  }
  onMonthChange(event:any): void {
     this.selectedMonth = event.target.value;
  }
  onYearChange(event:any): void{
    this.totalAmounts = []
    this.selectedYear = event.target.value
    this.months.forEach(month => {
      this.invoiceService.getTotalAmountByMonth(this.selectedYear, month)
        .subscribe(amount => {
          this.totalAmounts.push(amount);
          this.updateChart(); // Update the chart after fetching all data
        }, error => {
          console.error('Error retrieving total amount for month:', error);
        });
    });
  }
  updateChart(): void {
    if (this.chart && this.chart.data) { // Add null check for this.chart and this.chart.data
      this.chart.data.datasets[0].data = this.totalAmounts;
      // Redraw the chart
      this.chart.update();
    } else {
      console.error('Chart is not initialized or data is undefined');
    }
  }
  createChart(): void {
    this.chart = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Total Amount',
          data: this.totalAmounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear', // specify the type of scale
            ticks: {
            }
        }
      }
    }
    });
  }

  // Méthode pour récupérer le montant total en fonction du mois et de l'année sélectionnés
  getTotalAmount(): void {
    // Vérifier si le mois est sélectionné
    if (this.selectedMonth === null || this.selectedYear === 0 ) {
      console.error('Month or Year is not selected');
      return;
    }

    // Utiliser le service InvoiceService pour récupérer le montant total
    this.invoiceService.getTotalAmountByMonth(this.selectedYear, this.selectedMonth)
      .subscribe(amount => {
        this.totalAmount = amount; // Mettre à jour la variable totalAmount avec le montant reçu du service
      }, error => {
        console.error('Error retrieving total amount:', error);
      });
  }
}

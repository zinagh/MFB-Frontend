import { Component, OnInit } from '@angular/core';
import { Observable ,of } from 'rxjs';
import { RepaymentPlanServiceService } from 'src/app/repayment-plan/repayment-plan-service.service';

@Component({
  selector: 'app-repayment-plan',
  templateUrl: './repayment-plan.component.html',
  styleUrls: ['./repayment-plan.component.css']
})
export class RepaymentPlanComponent implements OnInit {
  excelDownloadLink: string | undefined;
  repaymentPlans$: Observable<any[]> = undefined as any;  // Initializing explicitly as undefined
  selectedRepaymentPlan$: Observable<any> = undefined as any;  // Initializing explicitly as undefined
  selectedPlanId: number = undefined as any;  // Initializing explicitly as undefined

  constructor(private repaymentPlanService: RepaymentPlanServiceService) { }
  ngOnInit(): void {
    this.repaymentPlans$ = this.repaymentPlanService.getRepaymentPlans();
  }
  exportToExcel(): void {
    this.repaymentPlanService.exportRepaymentPlanToExcel().subscribe({
      next: (data: Blob) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'RepaymentPlan.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error:', error.message);
        alert('Failed to export the repayment plan to Excel.');
      }
    });
  }

  fetchRepaymentPlans(): void {
    this.repaymentPlans$ = this.repaymentPlanService.getRepaymentPlans();
  }

  onSelectRepaymentPlan(planId: number): void {
    this.selectedPlanId = planId;
    this.selectedRepaymentPlan$ = this.repaymentPlanService.getRepaymentPlanById(planId);
  }
}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditComponent } from 'src/app/credit/credit.component';
import { CalculateRepaymentPlansComponent } from './calculate-repayment-plans/calculate-repayment-plans.component';
import { AffichageComponent } from './affichage/affichage.component';
import { ModifyCreditComponent } from './modify-credit/modify-credit.component';
import { RepaymentPlanComponent } from 'src/app/repayment-plan/repayment-plan.component';
import { AddCreditComponent } from './add-credit/add-credit.component';
import { ContractComponent } from './contract/contract.component';

import { StatisticComponent } from './statistic/statistic.component';
const routes: Routes = [
  { path: "Credit", component: CreditComponent },
  { path: "Modify/:id", component: ModifyCreditComponent },
  { path: 'excel', component: RepaymentPlanComponent },
  { path: "AffichageCredit", component: AffichageComponent},
  { path: "addCredit", component: AddCreditComponent},
  { path: 'contract', component: ContractComponent },
  { path: 'calculate', component: CalculateRepaymentPlansComponent },
  { path: 'statistic', component:StatisticComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

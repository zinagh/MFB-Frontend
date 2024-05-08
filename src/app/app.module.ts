import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
// Component imports
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { CreditComponent } from 'src/app/credit/credit.component';
import { AffichageComponent } from './affichage/affichage.component';
import { ModifyCreditComponent } from 'src/app/modify-credit/modify-credit.component';
import { RepaymentPlanComponent } from 'src/app/repayment-plan/repayment-plan.component';
import { AddCreditComponent } from './add-credit/add-credit.component';
import { ContractComponent } from './contract/contract.component';
import { CalculateRepaymentPlansComponent } from './calculate-repayment-plans/calculate-repayment-plans.component';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'addUser', component: AdduserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updateProfile', component: UpdateProfileComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    BaseComponent,
    FooterComponent,
    UsersComponent,
    AdduserComponent,
    ProfileComponent,
    UpdateProfileComponent,
    CreditComponent,
    AffichageComponent,
    ModifyCreditComponent,
    RepaymentPlanComponent,
    AddCreditComponent,
    ContractComponent,
    CalculateRepaymentPlansComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    // Angular Material Modules
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule, 
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

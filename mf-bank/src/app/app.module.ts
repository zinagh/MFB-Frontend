import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BaseComponent } from './base/base.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { AddbankAcComponent } from './addbank-ac/addbank-ac.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { InternationalTransferComponent } from './international-transfer/international-transfer.component';
import { AddinternationalTransferComponent } from './addinternational-transfer/addinternational-transfer.component';
import { InternationaltransferManagementComponent } from './internationaltransfer-management/internationaltransfer-management.component';
import { UpdateInternationaltransferComponent } from './update-internationaltransfer/update-internationaltransfer.component';
import { FormsModule } from '@angular/forms';
import { FeesComponent } from './fees/fees.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'addUser', component: AdduserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updateProfile', component: UpdateProfileComponent },
  { path: 'bankaccount', component: BankAccountComponent },
  { path: 'addBankAccount', component: AddbankAcComponent },
  { path: 'accountManagement', component: AccountManagementComponent },
  { path: 'updateAccount', component: UpdateAccountComponent },
  { path: 'internationaltransfer', component: InternationalTransferComponent },
  { path: 'addinternationaltransfer', component: AddinternationalTransferComponent },
  { path: 'internationaltransfermanagement', component: InternationaltransferManagementComponent },
  { path: 'updateinternationaltransfer', component: UpdateInternationaltransferComponent },
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
    BankAccountComponent,
    AddbankAcComponent,
    AccountManagementComponent,
    UpdateAccountComponent,
    InternationalTransferComponent,
    AddinternationalTransferComponent,
    InternationaltransferManagementComponent,
    UpdateInternationaltransferComponent,
    FeesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

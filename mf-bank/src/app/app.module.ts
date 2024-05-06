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
import { TransactionsComponent } from './transactions/transactions.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { HttpClientModule } from '@angular/common/http'; // Importez HttpClientModule
import { TransactionService } from './services/transaction.service';
import { ReactiveFormsModule } from '@angular/forms';




const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'addUser', component: AdduserComponent },
  { path: 'addTransaction', component: AddTransactionComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updateProfile', component: UpdateProfileComponent },
  { path: 'updateTransaction/:id', component: UpdateTransactionComponent },
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
    TransactionsComponent,
    AddTransactionComponent,
    UpdateTransactionComponent,

  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule,// Ajoutez HttpClientModule ici
    ReactiveFormsModule
  ],
  providers: [
    TransactionService // Ajoutez TransactionService ici
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
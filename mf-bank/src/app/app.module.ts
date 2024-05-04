  import { APP_INITIALIZER, NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { HomepageComponent } from './homepage/homepage.component';
  import { Router, RouterModule, Routes } from '@angular/router';
  import { DashboardComponent } from './dashboard/dashboard.component';
  import { BaseComponent } from './base/base.component';
  import { FooterComponent } from './footer/footer.component';
  import { UsersComponent } from './users/users.component';
  import { AdduserComponent } from './adduser/adduser.component';
  import { ProfileComponent } from './profile/profile.component';
  import { UpdateProfileComponent } from './update-profile/update-profile.component';
  import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
  import { SecurityService } from './services/security.service';
import { AuthGuard } from './guard/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { AddbankAcComponent } from './addbank-ac/addbank-ac.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { InternationalTransferComponent } from './international-transfer/international-transfer.component';
import { AddinternationalTransferComponent } from './addinternational-transfer/addinternational-transfer.component';
import { InternationaltransferManagementComponent } from './internationaltransfer-management/internationaltransfer-management.component';
import { FeesComponent } from './fees/fees.component';
import { UpdateInternationaltransferComponent } from './update-internationaltransfer/update-internationaltransfer.component';
import { AddfeeComponent } from './addfee/addfee.component';
import { UpdateFeeComponent } from './update-fee/update-fee.component';
import { BankaacountService } from './services/bankaacount.service';



  const routes: Routes = [
    { path: 'home', component: HomepageComponent},
    {path:'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent,canActivate: [AuthGuard]  },
    { path: 'addUser', component: AdduserComponent  ,canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent  ,canActivate: [AuthGuard]},
    { path: 'updateProfile', component: UpdateProfileComponent  ,canActivate: [AuthGuard]},
    { path: 'bankaccount', component: BankAccountComponent  ,canActivate: [AuthGuard]},
    { path: 'addBankAccount', component: AddbankAcComponent  ,canActivate: [AuthGuard]},
    { path: 'accountManagement', component: AccountManagementComponent  ,canActivate: [AuthGuard]},
    { path: 'updateAccount', component: UpdateAccountComponent  ,canActivate: [AuthGuard]},
    { path: 'internationaltransfer', component: InternationalTransferComponent ,canActivate: [AuthGuard] },
    { path: 'addinternationaltransfer', component: AddinternationalTransferComponent ,canActivate: [AuthGuard] },
    { path: 'internationaltransfermanagement', component: InternationaltransferManagementComponent  ,canActivate: [AuthGuard]},
    { path: 'updateinternationaltransfer', component: UpdateInternationaltransferComponent ,canActivate: [AuthGuard] },
    { path: 'fees', component: FeesComponent  ,canActivate: [AuthGuard]},
    { path: 'addfee', component: AddfeeComponent ,canActivate: [AuthGuard] },
    { path: 'updatefee', component: UpdateFeeComponent ,canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home' }
  ];

  export function initializeKeycloak(kcService: KeycloakService, securityService: SecurityService,router: Router) {
    return () => {
      return new Promise<void>((resolve, reject) => {
        kcService.init({
          config: {
            realm: "E-Bank",
            clientId: "mfbank",
            url: "http://localhost:8181",
          },
          initOptions: {
          }
        }).then(async () => {
          if (await kcService.isLoggedIn()) {
            kcService.loadUserProfile().then(profile => {
              securityService.profile = profile;
              resolve();
            }).catch((error) => {
              reject(error);
            });
          } else {
            resolve();
          }
        }).catch((error) => {
          reject(error);
        });
      });
    };
  }


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
      FeesComponent,
      AddfeeComponent,
      UpdateFeeComponent
  
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,
      BrowserModule,
      RouterModule.forRoot(routes),
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      KeycloakAngularModule
  
    ],
    providers: [
      BankaacountService,
      KeycloakService,
      SecurityService,
      AuthGuard,
      {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        multi: true,
        deps: [KeycloakService, SecurityService],
    }],
    bootstrap: [AppComponent]
  })
  export class AppModule { }

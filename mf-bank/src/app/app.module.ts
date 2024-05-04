  import { APP_INITIALIZER, NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import { MatBadgeModule } from '@angular/material/badge';

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
import { VarComponent } from './var/var.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateUserComponent } from './update-user/update-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';



  const routes: Routes = [
    { path: 'home', component: HomepageComponent},
    {path:'dashboard', component: DashboardComponent ,canActivate: [AuthGuard], data: { roles: ["STUDENT" , "UNIVERSITY" ,"COMPANY", "EMPLOYEE"] }},
    { path: 'users', component: UsersComponent,canActivate: [AuthGuard] },
    { path: 'addUser', component: AdduserComponent },
    { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard]},
    { path: 'updateProfile', component: UpdateProfileComponent,canActivate: [AuthGuard]},
    { path: 'updateUser', component: UpdateUserComponent,canActivate: [AuthGuard]},
    {path:"var",component:VarComponent},
    { path: '**', redirectTo:'home' }
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
      VarComponent,
      UpdateUserComponent,
      UpdateUserComponent
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      AppRoutingModule,
      KeycloakAngularModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      MatProgressBarModule,
      MatBadgeModule
    ],
    providers: [
      KeycloakService,
      SecurityService,
      {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        multi: true,
        deps: [KeycloakService, SecurityService],
    }],
    bootstrap: [AppComponent]
  })
  export class AppModule { }


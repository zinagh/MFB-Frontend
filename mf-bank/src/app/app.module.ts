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
  import { KeycloakService } from 'keycloak-angular';
  import { SecurityService } from './services/security.service';
import { TesthoussemComponent } from './testhoussem/testhoussem.component';
import { AuthGuard } from './guard/auth.guard';
import { VarComponent } from './var/var.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



  const routes: Routes = [
    { path: 'home', component: HomepageComponent},
    {path:'dashboard', component: DashboardComponent ,canActivate: [AuthGuard] },
    { path: 'users', component: UsersComponent,canActivate: [AuthGuard] },
    { path: 'addUser', component: AdduserComponent ,canActivate: [AuthGuard]},
    { path: 'profile', component: ProfileComponent ,canActivate: [AuthGuard]},
    { path: 'updateProfile', component: UpdateProfileComponent,canActivate: [AuthGuard]},
    {path:"tt",component:TesthoussemComponent,canActivate: [AuthGuard] },
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
      VarComponent
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      FormsModule
    ],
    providers: [
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


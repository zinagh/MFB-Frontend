import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { KeycloakService } from 'keycloak-angular';
import { SecurityService } from './services/security.service';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent ,},
  { path: 'users', component: UsersComponent },
  { path: 'addUser', component: AdduserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updateProfile', component: UpdateProfileComponent},
  { path: '**', redirectTo: 'home' }
];
export function initializeKeycloak(kcService: KeycloakService, securityService: SecurityService) {
  return () => {
    return new Promise<void>((resolve, reject) => {
      kcService.init({
        config: {
          realm: "E-Bank",
          clientId: "mfbank",
          url: "http://localhost:8181"
        },

        initOptions: {
          onLoad: "login-required"
        }
      }).then(() => {
        kcService.loadUserProfile().then(profile => {
          securityService.profile = profile;
          resolve();
        });
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
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule
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


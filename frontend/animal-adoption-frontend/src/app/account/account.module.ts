import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    PersonListComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule
  ]
})
export class AccountModule { }

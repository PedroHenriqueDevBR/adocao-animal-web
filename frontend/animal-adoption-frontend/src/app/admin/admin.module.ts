import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppBootstrapModule } from '../app-bootstrap/app-bootstrap.module';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { PersonManagerComponent } from './pages/person-manager/person-manager.component';
import { LocationManagerComponent } from './pages/location-manager/location-manager.component';


@NgModule({
  declarations: [
    AdminComponent,
    PersonListComponent,
    AdminHeaderComponent,
    PersonManagerComponent,
    LocationManagerComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    AppBootstrapModule,
  ]
})
export class AdminModule { }

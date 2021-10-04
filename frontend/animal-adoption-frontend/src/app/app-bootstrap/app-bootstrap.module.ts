import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from '../shared/components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true,
    }),
  ],
  exports: [
    ModalModule,
    ToastrModule,
    HeaderComponent,
    RouterModule,
  ]
})

export class AppBootstrapModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { HeaderComponent } from '../shared/components/header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
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

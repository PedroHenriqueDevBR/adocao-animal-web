import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalModule.forRoot()

  ],
  exports: [
    ModalModule
  ]
})

export class AppBootstrapModule { }

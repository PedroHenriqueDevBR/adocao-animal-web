import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    TypeaheadModule.forRoot()

  ],
  exports: [
    BrowserAnimationsModule,
    TypeaheadModule
  ]
})

export class AppBootstrapModule { }

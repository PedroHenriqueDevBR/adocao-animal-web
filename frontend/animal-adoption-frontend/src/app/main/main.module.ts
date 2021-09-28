import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderComponent } from './components/header/header.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { LocationAnimalsComponent } from './components/location-animals/location-animals.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    AnimalCardComponent,
    LocationAnimalsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }

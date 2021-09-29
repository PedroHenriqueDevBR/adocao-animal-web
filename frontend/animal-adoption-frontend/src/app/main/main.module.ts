import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalsForAdoptionComponent } from './pages/animals-for-adoption/animals-for-adoption.component';
import { SupportersComponent } from './components/supporters/supporters.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AnimalCardComponent,
    AnimalListComponent,
    AnimalsForAdoptionComponent,
    SupportersComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }

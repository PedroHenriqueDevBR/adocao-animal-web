import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalsForAdoptionComponent } from './pages/animals-for-adoption/animals-for-adoption.component';
import { SupportersComponent } from './components/supporters/supporters.component';
import { AppBootstrapModule } from '../app-bootstrap/app-bootstrap.module';


@NgModule({
  declarations: [
    AnimalCardComponent,
    AnimalListComponent,
    AnimalsForAdoptionComponent,
    SupportersComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AppBootstrapModule,
  ]
})
export class MainModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AnimalCardComponent } from './components/animal-card/animal-card.component';
import { AnimalListComponent } from './components/animal-list/animal-list.component';
import { AnimalsForAdoptionComponent } from './pages/animals-for-adoption/animals-for-adoption.component';
import { SupportersComponent } from './components/supporters/supporters.component';
import { AppBootstrapModule } from '../app-bootstrap/app-bootstrap.module';
import { MyAnimalsComponent } from './pages/my-animals/my-animals.component';
import { AnimalFormComponent } from './components/animal-form/animal-form.component';
import { EditAnimalCardComponent } from './components/edit-animal-card/edit-animal-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaccineComponent } from './components/vaccine/vaccine.component';
import { AnimalMapsComponent } from './pages/animal-maps/animal-maps.component';
import { AnimalFilterComponent } from './components/animal-filter/animal-filter.component';
import { ShowAnimalComponent } from './pages/show-animal/show-animal.component';


@NgModule({
  declarations: [
    AnimalCardComponent,
    AnimalListComponent,
    AnimalsForAdoptionComponent,
    SupportersComponent,
    MyAnimalsComponent,
    AnimalFormComponent,
    EditAnimalCardComponent,
    VaccineComponent,
    AnimalMapsComponent,
    AnimalFilterComponent,
    ShowAnimalComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }

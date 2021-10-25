import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalMapsComponent } from './pages/animal-maps/animal-maps.component';
import { AnimalsForAdoptionComponent } from './pages/animals-for-adoption/animals-for-adoption.component';
import { MyAnimalsComponent } from './pages/my-animals/my-animals.component';
import { ShowAnimalComponent } from './pages/show-animal/show-animal.component';

const routes: Routes = [
  { path: '', component:  AnimalsForAdoptionComponent },
  { path: 'meus', component:  MyAnimalsComponent },
  { path: 'mapa', component:  AnimalMapsComponent },
  { path: 'detalhes/:id', component:  ShowAnimalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsForAdoptionComponent } from './pages/animals-for-adoption/animals-for-adoption.component';
import { MyAnimalsComponent } from './pages/my-animals/my-animals.component';

const routes: Routes = [
  { path: '', component:  AnimalsForAdoptionComponent },
  { path: 'meus', component:  MyAnimalsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsForAdoptionComponent } from './pages/animals-for-adoption/animals-for-adoption.component';

const routes: Routes = [
  { path: '', component:  AnimalsForAdoptionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

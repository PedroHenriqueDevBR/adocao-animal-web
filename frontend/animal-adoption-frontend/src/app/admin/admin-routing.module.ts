import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LocationManagerComponent } from './pages/location-manager/location-manager.component';
import { PersonManagerComponent } from './pages/person-manager/person-manager.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'persons', component: PersonManagerComponent },
      { path: 'locations', component: LocationManagerComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAnimalPage } from './registro-animal.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAnimalPageRoutingModule {}

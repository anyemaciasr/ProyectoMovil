import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarAnimalPage } from './eliminar-animal.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarAnimalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EliminarClientePage } from './eliminar-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: EliminarClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EliminarClientePageRoutingModule {}

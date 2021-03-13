import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaProductoPage } from './consulta-producto.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultaProductoPageRoutingModule {}

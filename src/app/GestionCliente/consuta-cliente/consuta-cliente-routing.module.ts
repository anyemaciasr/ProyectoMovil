import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsutaClientePage } from './consuta-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: ConsutaClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsutaClientePageRoutingModule {}

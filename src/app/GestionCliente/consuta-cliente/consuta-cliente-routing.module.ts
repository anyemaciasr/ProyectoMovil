import { HttpClientModule } from '@angular/common/http';
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
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule],
})
export class ConsutaClientePageRoutingModule {}

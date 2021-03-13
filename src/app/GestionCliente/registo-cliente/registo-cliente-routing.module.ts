import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistoClientePage } from './registo-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: RegistoClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistoClientePageRoutingModule {}

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultaAnimalPage } from './consulta-animal.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule],
})
export class ConsultaAnimalPageRoutingModule {}

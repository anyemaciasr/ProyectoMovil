import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaVentaPageRoutingModule } from './consulta-venta-routing.module';

import { ConsultaVentaPage } from './consulta-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaVentaPageRoutingModule
  ],
  declarations: [ConsultaVentaPage]
})
export class ConsultaVentaPageModule {}

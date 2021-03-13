import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaProductoPageRoutingModule } from './consulta-producto-routing.module';

import { ConsultaProductoPage } from './consulta-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaProductoPageRoutingModule
  ],
  declarations: [ConsultaProductoPage]
})
export class ConsultaProductoPageModule {}

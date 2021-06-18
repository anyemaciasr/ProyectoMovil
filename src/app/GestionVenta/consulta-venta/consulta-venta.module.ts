import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaVentaPageRoutingModule } from './consulta-venta-routing.module';

import { ConsultaVentaPage } from './consulta-venta.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AvatarModule } from 'ngx-avatar';
import { FiltroFacturaPipe } from 'src/app/pipes/filtro-factura.pipe';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaVentaPageRoutingModule,
    AvatarModule,

  ],
  declarations: [ConsultaVentaPage,FiltroFacturaPipe]
})
export class ConsultaVentaPageModule {}

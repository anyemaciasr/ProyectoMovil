import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaProductoPageRoutingModule } from './consulta-producto-routing.module';

import { ConsultaProductoPage } from './consulta-producto.page';
import { AvatarModule } from 'ngx-avatar';
import { ComponentsModule } from 'src/app/components/components.module';
import { FiltroProductoPipe } from 'src/app/pipes/filtro-producto.pipe';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaProductoPageRoutingModule,
    AvatarModule,
  ],
  declarations: [ConsultaProductoPage,FiltroProductoPipe]
})
export class ConsultaProductoPageModule {}

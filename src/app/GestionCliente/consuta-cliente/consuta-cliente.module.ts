import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsutaClientePageRoutingModule } from './consuta-cliente-routing.module';

import { ConsutaClientePage } from './consuta-cliente.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AvatarModule } from 'ngx-avatar';
import { FiltroClientesPipe } from 'src/app/pipes/filtro-clientes.pipe';


@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ConsutaClientePageRoutingModule,
    AvatarModule
  ],
  declarations: [ConsutaClientePage, FiltroClientesPipe]
})
export class ConsutaClientePageModule {}

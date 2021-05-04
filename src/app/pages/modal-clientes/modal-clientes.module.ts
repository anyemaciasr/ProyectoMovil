import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalClientesPageRoutingModule } from './modal-clientes-routing.module';

import { ModalClientesPage } from './modal-clientes.page';
import { FiltroClientesPipe } from 'src/app/pipes/filtro-clientes.pipe';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalClientesPageRoutingModule,
    AvatarModule
  ],
  declarations: [ModalClientesPage,FiltroClientesPipe]
})
export class ModalClientesPageModule {}

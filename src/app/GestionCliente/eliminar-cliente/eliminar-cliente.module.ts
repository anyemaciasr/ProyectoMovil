import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarClientePageRoutingModule } from './eliminar-cliente-routing.module';

import { EliminarClientePage } from './eliminar-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarClientePageRoutingModule
  ],
  declarations: [EliminarClientePage]
})
export class EliminarClientePageModule {}

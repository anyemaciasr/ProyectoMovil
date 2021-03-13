import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarVentaPageRoutingModule } from './editar-venta-routing.module';

import { EditarVentaPage } from './editar-venta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarVentaPageRoutingModule
  ],
  declarations: [EditarVentaPage]
})
export class EditarVentaPageModule {}

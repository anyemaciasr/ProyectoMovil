import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroVentaPageRoutingModule } from './registro-venta-routing.module';

import { RegistroVentaPage } from './registro-venta.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroVentaPageRoutingModule
  ],
  declarations: [RegistroVentaPage]
})
export class RegistroVentaPageModule {}

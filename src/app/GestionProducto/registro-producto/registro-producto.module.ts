import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroProductoPageRoutingModule } from './registro-producto-routing.module';

import { RegistroProductoPage } from './registro-producto.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RegistroProductoPageRoutingModule
  ],
  declarations: [RegistroProductoPage]
})
export class RegistroProductoPageModule {}

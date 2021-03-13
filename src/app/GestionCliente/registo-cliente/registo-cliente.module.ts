import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistoClientePageRoutingModule } from './registo-cliente-routing.module';

import { RegistoClientePage } from './registo-cliente.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RegistoClientePageRoutingModule
  ],
  declarations: [RegistoClientePage]
})
export class RegistoClientePageModule {}

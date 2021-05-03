import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAnimalPageRoutingModule } from './registro-animal-routing.module';

import { RegistroAnimalPage } from './registro-animal.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroAnimalPageRoutingModule
  ],
  declarations: [RegistroAnimalPage]
})
export class RegistroAnimalPageModule {}

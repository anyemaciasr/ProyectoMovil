import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAnimalPageRoutingModule } from './editar-animal-routing.module';

import { EditarAnimalPage } from './editar-animal.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAnimalPageRoutingModule
  ],
  declarations: [EditarAnimalPage]
})
export class EditarAnimalPageModule {}

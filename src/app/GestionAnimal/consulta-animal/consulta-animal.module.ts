import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaAnimalPageRoutingModule } from './consulta-animal-routing.module';

import { ConsultaAnimalPage } from './consulta-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaAnimalPageRoutingModule
  ],
  declarations: [ConsultaAnimalPage]
})
export class ConsultaAnimalPageModule {}

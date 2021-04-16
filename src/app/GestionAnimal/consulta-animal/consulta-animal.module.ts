import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaAnimalPageRoutingModule } from './consulta-animal-routing.module';

import { ConsultaAnimalPage } from './consulta-animal.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaAnimalPageRoutingModule,
    AvatarModule
  ],
  declarations: [ConsultaAnimalPage]
})
export class ConsultaAnimalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EliminarAnimalPageRoutingModule } from './eliminar-animal-routing.module';

import { EliminarAnimalPage } from './eliminar-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EliminarAnimalPageRoutingModule
  ],
  declarations: [EliminarAnimalPage]
})
export class EliminarAnimalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaPageRoutingModule } from './consulta-routing.module';

import { ConsultaPage } from './consulta.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AvatarModule } from 'ngx-avatar';
import { FiltroFitosanitarioPipe } from 'src/app/pipes/filtro-fitosanitario.pipe';

@NgModule({
  imports: [
    ComponentsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaPageRoutingModule,
    AvatarModule
  ],
  declarations: [ConsultaPage,FiltroFitosanitarioPipe]
})
export class ConsultaPageModule {}

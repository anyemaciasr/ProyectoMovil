import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FiltroFitosanitarioPipe } from './pipes/filtro-fitosanitario.pipe';
import { FiltroProductoPipe } from './pipes/filtro-producto.pipe';

import { environment } from 'src/environments/environment';

import { FiltroFacturaPipe } from './pipes/filtro-factura.pipe';
@NgModule({
  declarations: [AppComponent, FiltroFacturaPipe],
  entryComponents: [],
  imports: [
    ComponentsModule,
    BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,

    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}

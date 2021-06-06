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
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,

    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}

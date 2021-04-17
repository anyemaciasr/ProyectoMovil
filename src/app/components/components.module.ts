import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { HeaderModalComponent } from './header-modal/header-modal.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HeaderModalComponent,
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    HeaderModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule { }

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Factura } from 'src/app/models/factura/factura';
import { Producto } from 'src/app/models/producto/producto';
import { ModalProductosPage } from 'src/app/pages/modal-productos/modal-productos.page';


@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.page.html',
  styleUrls: ['./registro-venta.page.scss'],
})
export class RegistroVentaPage implements OnInit {
  
  factura1:Factura={
    idFactura:"2020",
    fecha:new Date(),
    total:50000,
    descuento:2000,
   
  }

 

  
  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalProductosPage,
      cssClass: 'my-custom-class',
    });
    return await modal.present();
  }

 
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleFactura } from 'src/app/models/factura/detalleFactura';
import {  Factura } from 'src/app/models/factura/factura';
import { Producto } from 'src/app/models/producto/producto';
import { ModalProductosPage } from 'src/app/pages/modal-productos/modal-productos.page';


@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.page.html',
  styleUrls: ['./registro-venta.page.scss'],
})
export class RegistroVentaPage implements OnInit {


  detallesDeFactura:DetalleFactura[]=[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalProductosPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    this.detallesDeFactura = data;
  }


}

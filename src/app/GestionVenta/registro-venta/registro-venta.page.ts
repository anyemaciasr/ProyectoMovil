import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleFactura } from 'src/app/models/factura/detalleFactura';
import {  Factura } from 'src/app/models/factura/factura';
import { Producto } from 'src/app/models/producto/producto';
import { ModalProductosPage } from 'src/app/pages/modal-productos/modal-productos.page';
import {Cliente} from 'src/app/models/cliente/cliente';
import { ConsutaClientePage } from 'src/app/GestionCliente/consuta-cliente/consuta-cliente.page';
import { ActivatedRoute } from '@angular/router';
import { ModalClientesPage } from 'src/app/pages/modal-clientes/modal-clientes.page';

@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.page.html',
  styleUrls: ['./registro-venta.page.scss'],
})
export class RegistroVentaPage implements OnInit {


  factura:Factura;
  cliente:Cliente;
  constructor(private modalController: ModalController,private route: ActivatedRoute) { }

  ngOnInit() {
    this.construirFactura();
  }

  construirFactura(){
    var id = this.route.snapshot.paramMap.get("id");
    this.factura = new Factura();
    this.factura.idFactura = (Number(id) + 1).toString();
    this.factura.fecha = new Date();
    this.factura.detallesFactura = [];
    this.factura.cliente = new Cliente();
    
  }
  async presentModalProductos() {
    const modal = await this.modalController.create({
      component: ModalProductosPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    this.factura.detallesFactura = data;
  }

  async presentModalClientes(){
    const modal = await this.modalController.create({
      component: ModalClientesPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    this.factura.cliente = data;
  }

}

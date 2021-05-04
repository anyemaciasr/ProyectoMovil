import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {  Factura } from 'src/app/models/factura/factura';
import { ModalProductosPage } from 'src/app/pages/modal-productos/modal-productos.page';
import {Cliente} from 'src/app/models/cliente/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalClientesPage } from 'src/app/pages/modal-clientes/modal-clientes.page';
import { GestionFacturaService } from 'src/app/services/gestion-factura.service';


@Component({
  selector: 'app-registro-venta',
  templateUrl: './registro-venta.page.html',
  styleUrls: ['./registro-venta.page.scss'],
})
export class RegistroVentaPage implements OnInit {


  factura:Factura;
  cliente:Cliente;
  descuento:string="";
  constructor(private modalController: ModalController
    ,private route: ActivatedRoute
    ,private gestionFacturaService:GestionFacturaService
    ,private router:Router) { }

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
  calcularDescuento(){
    if(this.descuento == ""){
      this.descuento = "0";
      this.factura.descuento = Number(this.descuento);
      this.factura.total = this.factura.subTotal - this.factura.descuento;
      return;
    }
    if(Number(this.descuento)<100){
      this.factura.descuento = (this.factura.subTotal * Number(this.descuento))/100
    this.factura.total = this.factura.subTotal - this.factura.descuento;
    }else{
      this.descuento = "Rango mayor 100%"
    }
    
  }
  async presentModalProductos() {
    const modal = await this.modalController.create({
      component: ModalProductosPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    this.factura.detallesFactura = data;
    var total=0;
    this.factura.detallesFactura.forEach(element => {
      total+=element.subTotal
    });
    this.factura.subTotal = total;
    this.calcularDescuento();
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

  generarId(){
    var id = new Date();
    this.factura.detallesFactura.map(function (item) { 
     item.idDetalle = item.idDetalle + id.getFullYear().toString() + id.getMonth().toString() + id.getDay().toString() + id.getHours().toString() + id.getMinutes().toString() + id.getSeconds().toString();
      return item;
    });
  }
  fac:any;
  facturar(){
    this.generarId();   
    this.gestionFacturaService.guardar(this.factura).subscribe(f => {
      console.log(f);
    });
    this.router.navigate(['/consulta-venta']);
  }

}

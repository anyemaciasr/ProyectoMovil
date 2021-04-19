import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura/factura';

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

  
  constructor() { }

  ngOnInit() {
  }
}

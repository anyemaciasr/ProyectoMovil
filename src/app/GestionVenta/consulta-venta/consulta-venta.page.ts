import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/factura/factura';

@Component({
  selector: 'app-consulta-venta',
  templateUrl: './consulta-venta.page.html',
  styleUrls: ['./consulta-venta.page.scss'],
})
export class ConsultaVentaPage implements OnInit {
  factura:Factura;
  constructor() { }

  ngOnInit() {
  }
  facturas: Factura[] = [{
    idFactura:"2020",
    fecha:new Date(),
    total:500000,
    descuento:20000,

  },
  {
    idFactura:"2125",
    fecha:new Date(),
    total:300000,
    descuento:20000,

  },
  ];
}

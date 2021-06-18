import { Pipe, PipeTransform } from '@angular/core';
import { Factura } from '../models/factura/factura';

@Pipe({
  name: 'filtroFactura'
})
export class FiltroFacturaPipe implements PipeTransform {

  transform(facturas:Factura[], textoABuscar: string): any {
    if(textoABuscar==null) return facturas;
    return facturas.filter(f => f.idFactura.indexOf(textoABuscar.toLowerCase())!== -1);
  }

}

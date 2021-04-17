import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from '../models/cliente/cliente';

@Pipe({
  name: 'filtroClientes'
})
export class FiltroClientesPipe implements PipeTransform {

  transform(clientes: Cliente[], textoABuscar: string): any {
    if(textoABuscar==null) return clientes;
    return clientes.filter(c =>( c.nombres.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1) 
    || (c.apellidos.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1));
  }

}

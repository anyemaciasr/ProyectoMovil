import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto/producto';

@Pipe({
  name: 'filtroProducto'
})
export class FiltroProductoPipe implements PipeTransform {

  transform(productos: Producto[], textoABuscar: string): any {
    if(textoABuscar==null) return productos;
    return productos.filter(p =>( p.codigo.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1) 
    || (p.nombre.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1)
    || (p.categoria.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1));
  }

}

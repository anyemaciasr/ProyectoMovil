import { Pipe, PipeTransform } from '@angular/core';
import { Animal } from '../models/animal/animal';

@Pipe({
  name: 'filtroAnimal'
})
export class FiltroAnimalPipe implements PipeTransform {

  transform(animales: Animal[], textoABuscar: string): any {
    if(textoABuscar==null) return animales;
    return animales.filter(a =>( a.nombre.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1) 
    || (a.identificacion.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1)
    || (a.tipoGanado.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1)
    || (a.origen.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1)
    || (a.padre.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1));
  }
}

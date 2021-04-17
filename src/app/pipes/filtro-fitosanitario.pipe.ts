import { Pipe, PipeTransform } from '@angular/core';
import { Fitosanitario } from '../models/controlfitosanitario/fitosanitario';

@Pipe({
  name: 'filtroFitosanitario'
})
export class FiltroFitosanitarioPipe implements PipeTransform {
  transform(fitosanitarios: Fitosanitario[], textoABuscar: string): any {
    if(textoABuscar==null) return fitosanitarios;
    return fitosanitarios.filter(f =>( f.nombreMedicamento.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1) 
    || (f.animalTratado.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1)
    || (f.tipoMedicamento.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1)
    || (f.dosisAplicada.toLowerCase().indexOf(textoABuscar.toLowerCase()) !== -1));
  }

}

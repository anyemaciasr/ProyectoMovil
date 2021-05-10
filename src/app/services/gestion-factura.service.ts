import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DetalleFactura } from '../models/factura/detalleFactura';
import { Factura } from '../models/factura/factura';

@Injectable({
  providedIn: 'root'
})
export class GestionFacturaService {
  urlazure="https://villanorisapi.azurewebsites.net/Factura";
  url = "https://localhost:5001/Factura";
  constructor(public http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }
  
  handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('A ocurrido un error', error.error.message);
    }else{
      console.error(
        `Backend returned code ${error.status}`+
        ` Body was: ${error.message}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }

  consultar():Observable<Factura[]>{
    return this.http.get<Factura[]>(this.urlazure);
  }

  
  guardar(factura:Factura):Observable<any>{
    
    var facturaApi = new FacturaApi();
    facturaApi.fecha = factura.fecha;
    facturaApi.descuento = factura.descuento;
    facturaApi.ClienteIdentificacion = factura.cliente.identificacion;
    facturaApi.detallesDeFactura = factura.detallesFactura;
 
   return this.http.post(this.urlazure, JSON.stringify(facturaApi), this.httpOptions)
    .pipe(
      tap(_ => console.log("Factura Guardada")),
      catchError(this.handleError)
    );
  }

}
export class FacturaApi {
  fecha:Date;
  descuento:number;
  ClienteIdentificacion:string;
  detallesDeFactura:DetalleFactura[];
}

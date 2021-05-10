import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Producto } from '../models/producto/producto';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class GestionProductoService {

  url = "https://villanorisapi.azurewebsites.net/Producto";

  constructor(public http: HttpClient
    ,private handleErrorService:HandlerErrorService
    ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }


  consultar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  eliminar(id: number): Observable<Producto> {
    return this.http.delete<Producto>(this.url + '/' + id, this.httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.Mensaje('Producto eliminado exitosamente')),
      catchError(this.handleErrorService.handleError<Producto>('Eliminar producto', null))
      );
  }

  guardar(producto: Producto): Observable<any> {
    return this.http.post(this.url, JSON.stringify(producto), this.httpOptions)
      .pipe(
        tap(_ =>{
          this.handleErrorService.Mensaje('Producto guardado exitosamente')
        } ),
      catchError(this.handleErrorService.handleError<Producto>('Guardar producto', null))
      );
  }

  buscarProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.url + '/' + id, this.httpOptions)
      .pipe(
        tap(_ => this.handleErrorService.Mensaje('Producto encontrado exitosamente')),
      catchError(this.handleErrorService.handleError<Producto>('Buscar producto', null))
      );
  }

  actualizar(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url + '/' + id, JSON.stringify(producto), this.httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.Mensaje('Producto actualizado exitosamente')),
      catchError(this.handleErrorService.handleError<Producto>('Actualizar producto', null))
    );
  }

}

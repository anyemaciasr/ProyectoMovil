import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';
import { catchError, tap } from 'rxjs/operators';
import { HandlerErrorService } from './handler-error.service';
import {environment}from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GestionClientesService {
  url = environment.urlBaseDevelopment+"Cliente";

  urlazure = environment.urlBase + "Cliente";

  constructor(public http: HttpClient
    ,private handleErrorService:HandlerErrorService
    ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }


  consultar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlazure);
  }

  eliminar(id: string): Observable<Cliente> {
    return this.http.delete<Cliente>(this.urlazure + '/' + id, this.httpOptions)
      .pipe(
        tap(_ =>{
          this.handleErrorService.Mensaje('Clietne eliminado exitosamente')
        } ),
      catchError(this.handleErrorService.handleError<Cliente>('Eliminar cliente', null))
      );
  }

  buscarCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(this.urlazure + '/' + id, this.httpOptions)
      .pipe(
        tap(_ =>{
          this.handleErrorService.Mensaje('Cliente encontrado exitosamente')
        } ),
      catchError(this.handleErrorService.handleError<Cliente>('Buscar Cliente', null))
      );
  }

  actualizar(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.urlazure + '/' + id, JSON.stringify(cliente), this.httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.Mensaje('Cliente actualizado exitosamente')),
      catchError(this.handleErrorService.handleError<Cliente>('Actualizar cliente', null))
    );
  }

  guardar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlazure, JSON.stringify(cliente), this.httpOptions)
      .pipe(
        tap(_ =>{
          this.handleErrorService.Mensaje('Cliente guardado exitosamente')
        } ),
      catchError(this.handleErrorService.handleError<Cliente>('Guardar cliente', null))
      );
  }

}

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';
import { catchError, tap } from 'rxjs/operators';
import { HandlerErrorService } from './handler-error.service';
import {environment}from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class GestionClientesService {
  url = environment.urlBase+"Cliente";

  urlazure = environment.urlBase + "Cliente";

  constructor(public http: HttpClient
    ,private handleErrorService:HandlerErrorService
    ,private firestore:AngularFirestore
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

  //Servicios firebase fireStore


  agregarClienteFirebase(cliente:any):Promise<any>{
    return this.firestore.collection('Clientes').add(cliente).then(_ => {
      this.handleErrorService.Mensaje('Cliente guardado exitosamente')
    }).catch(this.handleErrorService.handleError<any>('Guardar cliente', null));
  }

  consultarClienteFirebase():Observable<any>{
    return this.firestore.collection('Clientes', ref => ref.orderBy("nombres")).snapshotChanges();
  }

  eliminarClienteFirebase(id:string):Promise<any>{
    return this.firestore.collection('Clientes').doc(id).delete().then(_ => {
      this.handleErrorService.Mensaje('Cliente Eliminado exitosamente')
    }).catch(this.handleErrorService.handleError<any>('Eliminar cliente', null));
  }

  obtenerClienteFirebase(id:string):Observable<any>{
    return this.firestore.collection('Clientes').doc(id).snapshotChanges()
    .pipe(
      tap(_ => this.handleErrorService.Mensaje('Cliente actualizado exitosamente')),
      catchError(this.handleErrorService.handleError<Cliente>('Actualizar cliente', null))
    );
  }

  actualizarClienteFirebase(id:string, cliente:any):Promise<any>{
    return this.firestore.collection('Clientes').doc(id).update(cliente).then(_ => {
      this.handleErrorService.Mensaje('Cliente actualizado exitosamente')
    }).catch(this.handleErrorService.handleError<any>('Actualizar cliente', null));
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario, UsuarioL } from '../models/Usuario/usuario';
import { HandlerErrorService } from './handler-error.service';
import {environment}from '../../environments/environment';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  url = environment.urlBaseDevelopment+"Usuario";
  logueado = false;
  urlazure = environment.urlBase + "Usuario";
  constructor(public http: HttpClient
    , private handleErrorService: HandlerErrorService
    , private storage: Storage
    ) {
      this.init();
    }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  guardar(usuario: Usuario): Observable<any> {
    return this.http.post(this.url, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        tap(_ =>{
          this.handleErrorService.Mensaje('Usuario guardado exitosamente')
        } ),
      catchError(this.handleErrorService.handleError<Usuario>('Guardar usuario', null))
      );
  }

  login(usuario: UsuarioL): Observable<UsuarioL>{
    return this.http.post<UsuarioL>(this.url, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        tap(_ =>{
          this.storage.set("usuarioActivo", _);
          this.handleErrorService.Mensaje('Bienvenido')
        } ),
      catchError(this.handleErrorService.handleError<UsuarioL>('Guardar usuario', null))
      );
  }

  usuarioLogueado():Promise<UsuarioL> {
    return this.storage.get("usuarioActivo")
  }

  cerrarSesion(){
    this.storage.remove("usuarioActivo");
  }

  async init(){
    await this.storage.create();
  }



}

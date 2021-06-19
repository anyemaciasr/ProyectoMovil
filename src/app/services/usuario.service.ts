import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../models/Usuario/usuario';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  url = "https://villanorisapi.azurewebsites.net/Usuario";
  constructor(public http: HttpClient
    , private handleErrorService: HandlerErrorService) { }

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

 
}

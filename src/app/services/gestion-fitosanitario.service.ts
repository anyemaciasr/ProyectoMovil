import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Fitosanitario } from '../models/controlfitosanitario/fitosanitario';
import { HandlerErrorService } from './handler-error.service';
@Injectable({
  providedIn: 'root'
})
export class GestionFitosanitarioService {
  url = environment.urlBase + 'Fitosanitario';
  constructor(public http: HttpClient
    ,private handleErrorService:HandlerErrorService
    ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  consultar():Observable<Fitosanitario[]>{
    return this.http.get<Fitosanitario[]>(this.url);
  }


  guardar(fitosanitario:Fitosanitario ):Observable<Fitosanitario>{
      return this.http.post<Fitosanitario>(this.url, JSON.stringify(fitosanitario), this.httpOptions)
      .pipe(
        tap(_ =>{
          this.handleErrorService.Mensaje('control guardado exitosamente')
        } ),
      catchError(this.handleErrorService.handleError<Fitosanitario>('Guardar fitosanitario', null))
      )
  }

  actualizar(id: string, fitosanitario: Fitosanitario): Observable<Fitosanitario> {
    return this.http.put<Fitosanitario>(this.url + '/' + id, JSON.stringify(fitosanitario), this.httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.Mensaje('registro actualizado exitosamente')),
      catchError(this.handleErrorService.handleError<Fitosanitario>('Actualizar registro', null))
   );
  }

  buscarFitosanitario(id: string): Observable<any> {
    return this.http.get<any>(this.url + '/' + id, this.httpOptions)
      .pipe(
        tap(_ =>{
          console.log(_)
          this.handleErrorService.Mensaje('registro encontrado exitosamente')
        } ),
      catchError(this.handleErrorService.handleError<Fitosanitario>('Buscar registro', null))
      );
  }
}

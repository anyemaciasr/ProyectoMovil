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

}

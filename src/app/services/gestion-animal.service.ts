import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Animal } from '../models/animal/animal';
import { HandlerErrorService } from './handler-error.service';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GestionAnimalService {

  url= environment.urlBase+"Animal";
  constructor(public http: HttpClient
    ,private handleErrorService:HandlerErrorService
    ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }


  consultar():Observable<Animal[]>{
    return this.http.get<Animal[]>(this.url);
  }

  eliminar(id:string):Observable<Animal>{
    return this.http.delete<Animal>(this.url + '/'+ id, this.httpOptions)
    .pipe(
      tap(_ =>{
        this.handleErrorService.Mensaje('Animal eliminado exitosamente')
      } ),
      catchError(this.handleErrorService.handleError<Animal>('Eliminar animal', null))
    );
  }

  buscarAnimal(id: string): Observable<any> {
    return this.http.get<any>(this.url + '/' + id, this.httpOptions)
      .pipe(
        tap(_ =>{
          console.log(_)
          this.handleErrorService.Mensaje('Animal encontrado exitosamente')
        } ),
      catchError(this.handleErrorService.handleError<Animal>('Buscar animal', null))
      );
  }
  guardar(animal:Animal):Observable<Animal>{
    return this.http.post<Animal>(this.url, JSON.stringify(animal), this.httpOptions)
    .pipe(
      tap(_ =>{
        this.handleErrorService.Mensaje('Animal guardado exitosamente')
      } ),
    catchError(this.handleErrorService.handleError<Animal>('Guardar animal', null))
    );
  }

  actualizar(id: string, animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(this.url + '/' + id, JSON.stringify(animal), this.httpOptions)
    .pipe(
      tap(_ => this.handleErrorService.Mensaje('Animal actualizado exitosamente')),
      catchError(this.handleErrorService.handleError<Animal>('Actualizar animal', null))
   );
  }
}

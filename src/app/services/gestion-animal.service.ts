import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Animal } from '../models/animal/animal';

@Injectable({
  providedIn: 'root'
})
export class GestionAnimalService {

  url="https://localhost:5001/Animal";
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
        ` Body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }

  consultar():Observable<Animal[]>{
    return this.http.get<Animal[]>(this.url);
  }

  eliminar(id:string):Observable<Animal>{
    return this.http.delete<Animal>(this.url + '/'+ id, this.httpOptions)
    .pipe(
      tap(_ => console.log("Animal eliminado")),
      catchError(this.handleError)
    );
  }

  guardar(animal:Animal):Observable<Animal>{
    return this.http.post<Animal>(this.url, JSON.stringify(animal), this.httpOptions)
    .pipe(
      tap(_ => console.log("Datos enviados")),
      catchError(this.handleError)
    );
  }
  
}

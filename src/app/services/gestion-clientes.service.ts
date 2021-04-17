import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Cliente } from '../models/cliente/cliente';
import { catchError, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GestionClientesService {
  url="https://localhost:5001/Cliente";
  
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

  consultar():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  eliminar(id:string):Observable<Cliente>{
    return this.http.delete<Cliente>(this.url + '/'+ id, this.httpOptions)
    .pipe(
      tap(_ => console.log("Cliente eliminado")),
      catchError(this.handleError)
    );
  }

  guardar(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url, JSON.stringify(cliente), this.httpOptions)
    .pipe(
      tap(_ => console.log("Datos enviados")),
      catchError(this.handleError)
    );
  }

}

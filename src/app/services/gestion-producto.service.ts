import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Producto } from '../models/producto/producto';

@Injectable({
  providedIn: 'root'
})
export class GestionProductoService {

  url = "https://localhost:5001/Producto";

  constructor(public http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A ocurrido un error', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}` +
        ` Body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }

  consultar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  eliminar(id: string): Observable<Producto> {
    return this.http.delete<Producto>(this.url + '/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log("Producto eliminado")),
        catchError(this.handleError)
      );
  }

  guardar(producto: Producto): Observable<any> {
    return this.http.post(this.url, JSON.stringify(producto), this.httpOptions)
      .pipe(
        tap(_ => console.log("Datos enviados")),
        catchError(this.handleError)
      );
  }

}

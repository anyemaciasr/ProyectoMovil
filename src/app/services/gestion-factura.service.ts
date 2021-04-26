import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Factura } from '../models/factura/factura';

@Injectable({
  providedIn: 'root'
})
export class GestionFacturaService {
  url="https://localhost:5001/Factura";
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

  consultar():Observable<Factura[]>{
    return this.http.get<Factura[]>(this.url);
  }

}

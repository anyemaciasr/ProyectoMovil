import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandlerErrorService {

  constructor(private toastController: ToastController) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if (error.status == "400") {

        this.mostrarError400(error);

      }
      else if (error.status == "401") {

        this.mostrarError400(error);

      }

      return of(result as T);
    };
  }

  async Mensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      keyboardClose: true,
      mode: "ios",
      position: "top",
      translucent: true
    });
    toast.present();
  }
  private mostrarError400(error: any): void {
    console.error(error);
    let contadorValidaciones: number = 0;
    let mensajeValidaciones: string =
      `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la
   operación.<br/><br/>`;
    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;
      error.error.errors[prop].forEach(element => {
        mensajeValidaciones += `<br/> - ${element}`;
      });
      mensajeValidaciones += `<br/>`;
    }
    this.Mensaje(mensajeValidaciones);
  }
}

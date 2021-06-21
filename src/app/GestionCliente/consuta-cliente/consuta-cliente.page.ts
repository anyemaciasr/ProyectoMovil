import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ToastController, ViewDidEnter } from '@ionic/angular';

import { Cliente } from 'src/app/models/cliente/cliente';
import { GestionClientesService } from 'src/app/services/gestion-clientes.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-consuta-cliente',
  templateUrl: './consuta-cliente.page.html',
  styleUrls: ['./consuta-cliente.page.scss'],
})
export class ConsutaClientePage implements OnInit {
  cliente: Cliente;
  textoABuscar: string;
  clientes: Cliente[] = [];
  loading: any;
  idFirebase: any[] = [];
  constructor(private sqlService: SqlServiceService
    , private actionSheetController: ActionSheetController
    , private alertController: AlertController
    , private router: Router
    , private toastController: ToastController
    , private gestionClientesService: GestionClientesService
    , private loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
  }

  doRefresh(event) {
    this.consultar();
    event.target.complete();
  }

  consultar() {
    this.gestionClientesService.consultar().subscribe(
      datos => {
        console.log(datos);
        this.clientes = datos;
        this.loading.dismiss();
        console.log("Datos de servidor recividos");
      }
    );

  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando lista de clientes',
      spinner: "crescent"
    });
    await this.loading.present();
    this.consultar();
  }


  opciones(cliente: Cliente) {
    this.presentActionSheet(cliente);
  }

  async presentActionSheet(cliente: Cliente) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class negrita',
      buttons: [
        {
          text: 'Consultar',
          icon: 'clipboard',
          cssClass: "gris",
          handler: () => {
            this.AlerConsulta(cliente);

          }
        },
        {
          text: 'Editar',
          icon: 'pencil',
          cssClass: "gris",
          handler: () => {
           // var clienteEliminar = this.idFirebase.find(c => c.identificacion == cliente.identificacion)
            this.router.navigate(['/editar-cliente', cliente.identificacion]);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          cssClass: "rojo",
          handler: () => {
            this.AlertEliminar(cliente);
          }
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          cssClass: "negrita gris",
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }


  async AlertEliminar(cliente: Cliente) {
    const alert = await this.alertController.create({
      cssClass: 'alerClasss',
      header: 'Alerta',
      subHeader: '',
      message: '<br>' + '¿Seguro que quiere eliminar a ' + '<b>'
        + cliente.nombres + ' ' + cliente.apellidos + '</b>'
        + ' de tu lista de clientes?',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          cssClass: "rojo",
          handler: () => {

            this.gestionClientesService.eliminar(cliente.identificacion).subscribe( c => {
              this.presentLoading();
            })

            // var clienteEliminar = this.idFirebase.find(c => c.identificacion == cliente.identificacion);
            // this.gestionClientesService.eliminarClienteFirebase(clienteEliminar.id).then(() => {
            //   console.log("Cliente eliminado correctamente");
            //   this.presentLoading();
            // }).catch(error => console.log(error))
          },

        }
      ],
    });

    await alert.present();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cliente eliminado exitosamente',
      duration: 2000
    });
    toast.present();
  }
  async AlerConsulta(cliente: Cliente) {
    const alert = await this.alertController.create({
      cssClass: 'alerClasss',
      header: 'Datos del cliente',
      message: '<br><br>' + 'Identificacion: ' + cliente.identificacion
        + '<br>Nombres: ' + cliente.nombres + '<br>Apellidos: '
        + cliente.apellidos
        + '<br>Telefono: ' + cliente.telefono + '<br>Correo: '
        + cliente.correo,
      buttons: ['OK']
    });

    await alert.present();
  }

}

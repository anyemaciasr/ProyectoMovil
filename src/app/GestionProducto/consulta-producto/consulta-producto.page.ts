import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto/producto';
import { GestionProductoService } from 'src/app/services/gestion-producto.service';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.page.html',
  styleUrls: ['./consulta-producto.page.scss'],
})
export class ConsultaProductoPage implements OnInit {
  textoABuscar: string;
  producto: Producto;
  productos: Producto[] = [];
  loading: any;
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController, private router: Router
    , private loadingController: LoadingController
    , private gestionProductoService: GestionProductoService
    , private toastController: ToastController, private navCtrl: NavController) { }

  ngOnInit() {
    this.producto = new Producto();
    this.presentLoading();
  }



  doRefresh(event) {
    this.consultar();
    event.target.complete();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando lista de productos',
      spinner: "crescent"
    });
    await this.loading.present();
    this.consultar();

  }

  consultar() {
    this.gestionProductoService.consultar().subscribe(
      datos => {
        console.log(datos);
        this.productos = datos;
        this.loading.dismiss();
        console.log("Datos de servidor recividos");
      }
    );

  }

  redirectTo() {
    this.navCtrl.navigateForward('/registro-producto');
  }

  opciones(producto: Producto) {
    this.presentActionSheet(producto);
  }

  async presentActionSheet(producto: Producto) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class negrita',
      buttons: [
        {
          text: 'Consultar',
          icon: 'clipboard',
          cssClass: "gris",
          handler: () => {
            this.AlerConsulta(producto);

          }
        },
        {
          text: 'Editar',
          icon: 'pencil',
          cssClass: "gris",
          handler: () => {
            this.router.navigate(['/editar-producto', producto.codigo]);
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          cssClass: "rojo",
          handler: () => {
            this.AlertEliminar(producto);
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

  async AlertEliminar(producto: Producto) {
    const alert = await this.alertController.create({
      cssClass: 'alerClasss',
      header: 'Alerta',
      subHeader: '',
      message: '<br>'+'¿Seguro que quiere eliminar el producto ' + '<b>'
        + producto.nombre + ' con codigo ' + producto.codigo + '</b>'
        + ' de tu lista de productos?',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          cssClass: "rojo",
          handler: () => {
            this.gestionProductoService.eliminar(Number(producto.codigo)).subscribe(p => console.log("Producto eliminado"));
            this.presentLoading();
          },

        }
      ],
    });

    await alert.present();
  }

  async AlerConsulta(producto: Producto) {
    const alert = await this.alertController.create({
      cssClass: 'alerClasss',
      header: 'Datos del producto',
      message: this.contruirMensaje(producto),
      animated:true,
      buttons: [
        {

          text:'Listo',
      }

      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto eliminado exitosamente',
      duration: 2000
    });
    toast.present();
  }

  contruirMensaje(producto: Producto): string {
    var cuerpoConsulta = `<ion-list >
              <ion-item lines="none">
              <p class="items"><strong>Codigo:</strong> `+ producto.codigo + `</p>
              </ion-item>
              <ion-item lines="none">
                <p class="items"><strong>Nombre:</strong> `+ producto.nombre + `</p>
              </ion-item>
              <ion-item lines="none">
                <p class="items"><strong>Categoria:</strong> `+ producto.categoria + `</p>
              </ion-item>
              <ion-item lines="none">
                <p class="items"><strong>Precio:</strong> `+ producto.precio + `</p>
              </ion-item>
              <ion-item lines="none">
                <p class="items"><strong>Descripcion:</strong> `+ producto.descripcion + `</p>
              </ion-item>
          </ion-list>`;
    return cuerpoConsulta;
  }


}

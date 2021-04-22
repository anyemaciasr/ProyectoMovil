import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Factura } from 'src/app/models/factura/factura';

@Component({
  selector: 'app-consulta-venta',
  templateUrl: './consulta-venta.page.html',
  styleUrls: ['./consulta-venta.page.scss'],
})
export class ConsultaVentaPage implements OnInit {
  factura: Factura;
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController, private router: Router
    , private toastController: ToastController, private navCtrl: NavController) { }

  ngOnInit() {
  }

  doRefresh(event) {
    event.target.complete();
  }


  redirectTo() {
    this.navCtrl.navigateForward('/registro-venta');
  }

  opciones(factura: Factura) {
    this.presentActionSheet(factura);
  }

  async presentActionSheet(factura: Factura) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class negrita',
      buttons: [
        {
          text: 'Consultar',
          icon: 'clipboard',
          cssClass: "gris",
          handler: () => {
            this.AlerConsulta(factura);

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
  async AlerConsulta(factura: Factura) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Datos de la factura',
      message: 'Codigo: ' + factura.idFactura
        + '<br>Cliente: jolo ' + factura.idFactura
        + '<br>Fecha: ' + factura.fecha + '<br>subTotal: ' + factura.subTotal
        + '<br>Descuento: ' + factura.descuento + '<br>Total: ' + factura.total,
      buttons: ['OK']
    });

    await alert.present();
  }
}

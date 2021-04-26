import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Factura } from 'src/app/models/factura/factura';
import { GestionFacturaService } from 'src/app/services/gestion-factura.service';

@Component({
  selector: 'app-consulta-venta',
  templateUrl: './consulta-venta.page.html',
  styleUrls: ['./consulta-venta.page.scss'],
})
export class ConsultaVentaPage implements OnInit {
  factura: Factura;
  facturas: Factura[] = [];
  loading: any;
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController, private router: Router
    , private toastController: ToastController, private navCtrl: NavController
    , private loadingController: LoadingController, private gestionFacturaService: GestionFacturaService) { }

  ngOnInit() {
    this.presentLoading();
  }

  routerLink(){
    this.router.navigate(['/registro-venta', this.facturas.length]);
  }

  doRefresh(event) {
    this.consultar();
    event.target.complete();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando lista de clientes',
      spinner: "crescent"
    });
    await this.loading.present();
    this.consultar();
    await this.loading.dismiss();
  }

  consultar() {
    this.gestionFacturaService.consultar().subscribe(
      datos => {
        console.log(datos);
        this.facturas = datos;
        console.log("Datos de servidor recividos");
        console.log("Factura objeto ", this.facturas);
      }
    );
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

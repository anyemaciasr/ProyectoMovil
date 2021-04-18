import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto/producto';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.page.html',
  styleUrls: ['./consulta-producto.page.scss'],
})
export class ConsultaProductoPage implements OnInit {
  textoABuscar:string;
  producto: Producto;
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController, private router:Router
    , private toastController:ToastController, private navCtrl:NavController) { }

  ngOnInit() {
    this.producto = new Producto();
  }


  productos: Producto[] = [{
    codigo:"1234",
    nombre:"carne",
    categoria:"red",
    precio:50000,
    descripcion:"carne roja",

  },
  {
    codigo:"5050",
    nombre:"leche",
    categoria:"lacteos",
    precio:100000,
    descripcion:"leche entera",

  },
  ];

  doRefresh(event) {
    event.target.complete();
  }


  redirectTo(){
    this.navCtrl.navigateForward('/registro-producto');
  }

  opciones(producto :Producto) {
    this.presentActionSheet(producto);
  }

  async presentActionSheet(producto :Producto) {
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
            this.router.navigate(['/editar-producto']);
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

  async AlertEliminar(producto:Producto) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Alerta',
      subHeader: '',
      message: '¿Seguro que quiere eliminar el producto'+'<b>'
      + producto.nombre +' con codigo ' + producto.codigo + '</b>'
      +' de tu lista de productos?',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          cssClass: "rojo",
          handler: () => {

          },

        }
      ],
    });

    await alert.present();
  }

  async AlerConsulta(producto:Producto) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Datos del producto',
      message: 'Codigo: ' + producto.codigo 
      +'<br>Nombre: '+ producto.nombre+'<br>Precio: '+producto.precio 
      +'<br>categoria: '+ producto.categoria +'<br>Descripcion: '
      +producto.descripcion, 
      buttons: ['OK']
    });

    await alert.present();
  }
  
}

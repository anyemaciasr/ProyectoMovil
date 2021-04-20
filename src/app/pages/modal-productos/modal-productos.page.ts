import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto/producto';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.page.html',
  styleUrls: ['./modal-productos.page.scss'],
})
export class ModalProductosPage implements OnInit {

  constructor(private modalController:ModalController,private alertController:AlertController ) { }
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
  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cantidad',
      inputs: [
        {
          name: 'name1',
          type: 'number',
          placeholder: 'Ingrese la cantidad'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data:any) => {
            console.log(data);
          }
        }
      ]
    });

    await alert.present();
  }
}

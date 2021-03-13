import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente/cliente';

@Component({
  selector: 'app-consuta-cliente',
  templateUrl: './consuta-cliente.page.html',
  styleUrls: ['./consuta-cliente.page.scss'],
})
export class ConsutaClientePage implements OnInit {
  cliente: Cliente;
  constructor(private actionSheetController: ActionSheetController, private alertController: AlertController, private router:Router) { }

  clientes: Cliente[] = [{
    identificacion: "123456",
    nombres: "juan carlos",
    apellidos: "ortiz",
    telefono: "3013222303",
    correo: "angely@gmail.com"
  },
  {
    identificacion: "183456",
    nombres: "juan ",
    apellidos: "ortiz",
    telefono: "5726145",
    correo: "jk@gmail.com"
  }
  ];


  ngOnInit() {
    this.cliente = new Cliente();
  }
  opciones(cliente :Cliente) {
    this.presentActionSheet(cliente);
  }

  async presentActionSheet(cliente :Cliente) {
    const actionSheet = await this.actionSheetController.create({
      header: '',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        cssClass: "rojo",
        handler: () => {
          this.AlertEliminar();
        }
      },
      {
        text: 'Consultar',
        icon: 'clipboard',
        handler: () => {
         this.AlerConsulta(cliente);
          
        }
      },
      {
        text: 'Editar',
        icon: 'pencil',
        handler: () => {
          this.router.navigate(['/editar-cliente']);
        }
      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  async AlertEliminar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      subHeader: '',
      message: 'Esta seguro de eliminar este cliente',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "rojo",
        },
        {
          text: "Eliminar",
          handler: () => { console.log("click en ok") },

        }
      ],
    });

    await alert.present();
  }
  async AlerConsulta(cliente:Cliente) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Datos cliente',
      subHeader: 'Subtitle',
      message: 'identificacion: ' + cliente.identificacion +'<br>Nombres: '+ cliente.nombres +'<br>Apellidos: '+cliente.apellidos
      +'<br>Telefono: '+ cliente.telefono +'<br>Correo: '+cliente.correo,
      buttons: ['OK']
    });

    await alert.present();
  }

}

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
    identificacion: "1234567893",
    nombres: "Juan carlos",
    apellidos: "ortiz reales",
    telefono: "3013222303",
    correo: "angely@gmail.com"
  },
  {
    identificacion: "1003244070",
    nombres: "Ayelyn ",
    apellidos: "macias reyes",
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
            this.router.navigate(['/editar-cliente']);
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


  async AlertEliminar(cliente:Cliente) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Alerta',
      subHeader: '',
      message: '¿Seguro que quiere eliminar a '+'<b>'
      + cliente.nombres +' ' + cliente.apellidos + '</b>'
      +' de tu lista de clientes?',
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Eliminar",
          cssClass: "rojo",
          handler: () => { console.log("click en ok") },

        }
      ],
    });

    await alert.present();
  }
  async AlerConsulta(cliente:Cliente) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Datos del cliente',
      message: 'Identificacion: ' + cliente.identificacion 
      +'<br>Nombres: '+ cliente.nombres +'<br>Apellidos: '
      +cliente.apellidos
      +'<br>Telefono: '+ cliente.telefono +'<br>Correo: '
      +cliente.correo,
      buttons: ['OK']
    });

    await alert.present();
  }

}

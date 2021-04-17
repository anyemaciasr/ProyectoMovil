import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Fitosanitario } from 'src/app/models/controlfitosanitario/fitosanitario';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  fitosanitario: Fitosanitario;
  textoABuscar:string;
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController, private router:Router
    , private toastController:ToastController, private navCtrl:NavController) { }

  ngOnInit() {
    this.fitosanitario=new Fitosanitario();
  }

  fitosanitarios: Fitosanitario[] = [{
    nombreMedicamento:"gogo",
    dosisAplicada:"500",
    tiempoRetiro:"30 mn",
    tipoMedicamento:"acetaminofen",
    animalTratado:"yo",
    fechaAplicacion: new Date()

  },
  {
    nombreMedicamento:"error",
    dosisAplicada:"20",
    tiempoRetiro:"30 mn",
    tipoMedicamento:"axido",
    animalTratado:"koko",
    fechaAplicacion: new Date()

  },
  ];

  doRefresh(event) {
    event.target.complete();
  }
  redirectTo(){
    this.navCtrl.navigateForward('/registro');
  }

  opciones(fitosanitario :Fitosanitario) {
    this.presentActionSheet(fitosanitario);
  }

  async presentActionSheet(fitosanitario :Fitosanitario) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class negrita',
      buttons: [
        {
          text: 'Consultar',
          icon: 'clipboard',
          cssClass: "gris",
          handler: () => {
           this.AlerConsulta(fitosanitario);
            
          }
        },
        {
          text: 'Editar',
          icon: 'pencil',
          cssClass: "gris",
          handler: () => {
            this.router.navigate(['/editar']);
          }
        },
        {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        cssClass: "rojo",
        handler: () => {
          this.AlertEliminar(fitosanitario);
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


  async AlertEliminar(fitosanitario :Fitosanitario) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Alerta',
      subHeader: '',
      message: '¿Seguro que quiere eliminar el registro fitosanitario del animal con identificación '+'<b>'
      + fitosanitario.animalTratado +' con fecha de aplicacion ' + fitosanitario.fechaAplicacion + '</b>'
      +' de tu lista de registos fitosanitarios?',
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


  async AlerConsulta(fitosanitario :Fitosanitario) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Datos del registro',
      message: 'Animal tratado: ' + fitosanitario.animalTratado 
      +'<br>Nombre medicamento: '+ fitosanitario.nombreMedicamento  +'<br>Dosis aplicada: '+fitosanitario.dosisAplicada 
      +'<br>tipo medicamento: '+ fitosanitario.tipoMedicamento  +'<br>Tiempo de retiro: '+fitosanitario.tiempoRetiro 
      +'<br>Fecha aplicacion: '+  fitosanitario.fechaAplicacion,
      buttons: ['OK']
    });

    await alert.present();
  }
}

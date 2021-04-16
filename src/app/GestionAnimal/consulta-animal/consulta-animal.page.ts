import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Animal } from 'src/app/models/animal/animal';

@Component({
  selector: 'app-consulta-animal',
  templateUrl: './consulta-animal.page.html',
  styleUrls: ['./consulta-animal.page.scss'],
})
export class ConsultaAnimalPage implements OnInit {
  animal: Animal;
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController, private router:Router
    , private toastController:ToastController, private navCtrl:NavController) { }

  animales: Animal[] = [{
    identificacion:"123456",
    agrupacion:"lote",
    fechaNacimiento:"ff",
    origen:"valledupar",
    padre:"string",
    madre:"string",
    pesoInicial:20,
    pesoFinal:30,
    tipoGanado:"vaca"

  },
  {
    identificacion:"1238856",
    agrupacion:"unidad",
    fechaNacimiento:"ff",
    origen:"valledupar",
    padre:"string",
    madre:"string",
    pesoInicial:20,
    pesoFinal:30,
    tipoGanado:"vaca"

  },
  ];

  ngOnInit() {
    this.animal = new Animal();
  }

  redirectTo(){
    this.navCtrl.navigateForward('/registro-animal');
  }

  opciones(animal :Animal) {
    this.presentActionSheet(animal);
  }

  fitosanitario(animal :Animal){
    this.Alertfitosanitario(animal);

  }

  async presentActionSheet(animal :Animal) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class negrita',
      buttons: [
        {
          text: 'Consultar',
          icon: 'clipboard',
          cssClass: "gris",
          handler: () => {
           this.AlerConsulta(animal);
            
          }
        },
        {
          text: 'Editar',
          icon: 'pencil',
          cssClass: "gris",
          handler: () => {
            this.router.navigate(['/editar-animal']);
          }
        },
        {
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        cssClass: "rojo",
        handler: () => {
          this.AlertEliminar(animal);
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


  async AlertEliminar(animal:Animal) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Alerta',
      subHeader: '',
      message: '¿Seguro que quiere eliminar a el animal con identificación'+'<b>'
      + animal.identificacion +' de tipo ' + animal.tipoGanado + '</b>'
      +' de tu lista de animales?',
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

  async AlerConsulta(animal:Animal) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Datos del animal',
      message: 'Identificacion: ' + animal.identificacion 
      +'<br>Padre: '+ animal.padre +'<br>Madres: '+animal.madre 
      +'<br>Agrupacion: '+ animal.agrupacion +'<br>Origen: '
      +animal.origen 
      +'<br>Peso inicial: '+ animal.pesoInicial +'<br>Peso final: '
      +animal.pesoFinal
      +'<br>Tipo ganado: '+ animal.tipoGanado +'<br>Fecha de nacimiento: '
      +animal.fechaNacimiento,
      buttons: ['OK']
    });

    await alert.present();
  }
  




  async Alertfitosanitario(animal:Animal) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class ',
      header: 'Gestion Fitosanitaria',
      subHeader: '',
      message: 'Selecione una opcion',
      buttons: [
        {
          text: 'Registrar',
          handler: () => {
            this.router.navigate(['/registro']);
          }
        },
        {
          text: 'Consultar',
          handler: () => {
            this.router.navigate(['/registrar']);
          }
        },
        {
          text: 'Editar',
          handler: () => {
            this.router.navigate(['/registrar']);
          }
        },
        
      ],
    });

    await alert.present();
  }
}

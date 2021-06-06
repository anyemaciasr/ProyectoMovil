import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Animal } from 'src/app/models/animal/animal';
import { GestionAnimalService } from 'src/app/services/gestion-animal.service';

@Component({
  selector: 'app-consulta-animal',
  templateUrl: './consulta-animal.page.html',
  styleUrls: ['./consulta-animal.page.scss'],
})
export class ConsultaAnimalPage implements OnInit {
  textoABuscar:string;
  animal: Animal;
  loading:any;
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController, private router:Router
    , private toastController:ToastController, private navCtrl:NavController
    ,private gestionAnimalService:GestionAnimalService
    ,private loadingController:LoadingController) { }

  animales: Animal[] = [];

  ngOnInit() {
    this.animal = new Animal();
    this.presentLoading();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando lista de animales',
      spinner: "crescent"
    });
    await this.loading.present();
    this.consultar();

  }

  doRefresh(event) {
    this.consultar();
    event.target.complete();
  }

  consultar(){
    this.gestionAnimalService.consultar().subscribe(a => {
      this.animales = a
      this.loading.dismiss();
      console.log('Datos Recibidos', a);
    });
  }

  redirectTo(){
    this.navCtrl.navigateForward('/registro-animal');
  }

  opciones(animal :Animal) {
    this.presentActionSheet(animal);
  }

  redirectToRegistroFito(id){
    this.router.navigate(['/registro', id])
  }

  redirectToConsulta(id){
    this.router.navigate(['/consulta', id])
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
            this.router.navigate(['/editar-animal',animal.identificacion]);
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
      cssClass: 'alerClasss',
      header: 'Alerta',
      subHeader: '',
      message: '<br>'+ '¿Seguro que quiere eliminar a el animal con identificación'+'<b>'
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
            this.gestionAnimalService.eliminar(animal.identificacion).subscribe(a => this.presentLoading());
          },

        }
      ],
    });

    await alert.present();
  }

  async AlerConsulta(animal:Animal) {
    const alert = await this.alertController.create({
      cssClass: 'alerClasss',
      header: 'Datos del animal',
      message: '<br><br>'+ 'Identificacion: ' + animal.identificacion
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

}

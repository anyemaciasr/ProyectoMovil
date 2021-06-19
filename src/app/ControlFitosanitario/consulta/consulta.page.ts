import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Fitosanitario } from 'src/app/models/controlfitosanitario/fitosanitario';
import { GestionAnimalService } from 'src/app/services/gestion-animal.service';
import { GestionFitosanitarioService } from 'src/app/services/gestion-fitosanitario.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  fitosanitario: Fitosanitario;
  textoABuscar: string;
  loading: any;
  fitosanitarios: Fitosanitario[] = [];
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController, private router: Router
    , private toastController: ToastController, private navCtrl: NavController
    , private gestionFitosanitarioService: GestionFitosanitarioService
    , private loadingController: LoadingController
    , private route: ActivatedRoute
    , private gestionAnimalService: GestionAnimalService
  ) { }

  ngOnInit() {
    this.fitosanitario = new Fitosanitario();
    this.presentLoading();
  }



  consultar() {
    var id = this.route.snapshot.paramMap.get("id");
    if (id == "todos") {
      this.gestionFitosanitarioService.consultar().subscribe(
        datos => {
          console.log(datos);
          this.fitosanitarios = datos;
          this.loading.dismiss();
          console.log("Datos de servidor recividos");
        }
      );
      return;
    }

    this.gestionAnimalService.buscarAnimal(id).subscribe(a => {
      if(a != null){
        this.fitosanitarios = a.controles;
        this.loading.dismiss();
      }
    })


  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando lista de controles fitosanitarios',
      spinner: "crescent"
    });
    await this.loading.present();
    this.consultar();

  }

  doRefresh(event) {
    this.consultar();
    event.target.complete();
  }
  redirectTo() {
    this.navCtrl.navigateForward('/registro');
  }

  opciones(fitosanitario: Fitosanitario) {
    this.presentActionSheet(fitosanitario);
  }

  async presentActionSheet(fitosanitario: Fitosanitario) {
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
            this.router.navigate(['/editar',fitosanitario.codigo]);
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


  async AlertEliminar(fitosanitario: Fitosanitario) {
    const alert = await this.alertController.create({
      cssClass: 'alerClasss',
      header: 'Alerta',
      subHeader: '',
      message: '¿Seguro que quiere eliminar el registro fitosanitario del animal con identificación ' + '<b>'
        + fitosanitario.animalIdentificacion + ' con fecha de aplicacion ' + fitosanitario.fechaAplicacion + '</b>'
        + ' de tu lista de registos fitosanitarios?',
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


  async AlerConsulta(fitosanitario: Fitosanitario) {
    const alert = await this.alertController.create({
      cssClass: 'alerClasss',
      header: 'Datos del registro',
      message: 'Animal tratado: ' + fitosanitario.animalIdentificacion
        + '<br>Nombre medicamento: ' + fitosanitario.nombreMedicamento + '<br>Dosis aplicada: ' + fitosanitario.dosisAplicada
        + '<br>tipo medicamento: ' + fitosanitario.tipoMedicamento + '<br>Tiempo de retiro: ' + fitosanitario.tiempoRetiro
        + '<br>Fecha aplicacion: ' + fitosanitario.fechaAplicacion,
      buttons: ['OK']
    });

    await alert.present();
  }
}

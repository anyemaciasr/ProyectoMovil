import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Animal } from 'src/app/models/animal/animal';
import { GestionAnimalService } from 'src/app/services/gestion-animal.service';

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.page.html',
  styleUrls: ['./editar-animal.page.scss'],
})
export class EditarAnimalPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;
  agrupacion: string;
  activeIndex: number = 0;
  animal: Animal;
  animales: Animal[] = [];
  formGroup: FormGroup;
  loading:any;
  constructor(private actionSheetController: ActionSheetController
    , private alertController: AlertController
    , private toastController: ToastController
    , private gestionAnimalService: GestionAnimalService
    , private router: Router
    , private formBuilder: FormBuilder
    , private route: ActivatedRoute
    , private loadingController:LoadingController,
  ) { }

  ngOnInit() {
    this.animal = new Animal();
    this.buildForm(this.animal);
    this.presentLoading();
  }

  consultarAnimal() {
    var id = this.route.snapshot.paramMap.get("id");
    this.gestionAnimalService.buscarAnimal(id).subscribe(a => {
      this.buildForm(a);
      this.loading.dismiss();
    }
    );

  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando datos del animal',
      spinner: "crescent",
    });
    await this.loading.present();
    this.consultarAnimal();
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    freeMode: false,
  }

  onChange(event) {
    this.agrupacion = event;
    console.log(this.agrupacion);
    this.validarAgrupacion();
  }
  validarAgrupacion() {
    if (this.agrupacion == "Lote") {
      return true;
    }
    return false;
  }

  slideChanged() {
    this.slides.getActiveIndex().then(index => {
      this.activeIndex = index
    });
  }

  cambiarIndex(i: number) {
    this.activeIndex = i;
    this.slides.slideTo(this.activeIndex);
  }


  async AgrupacionLote() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ingrese la cantidad',
      inputs: [
        {
          name: 'name1',
          type: 'number',
          label: 'Cantidad'
        },
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  buildForm(animalEncontrado: Animal) {
    this.animal = animalEncontrado;

    this.formGroup = this.formBuilder.group({
      identificacion: [this.animal.identificacion, [Validators.required]],
      nombre: [this.animal.nombre, Validators.required],
      agrupacion: [this.animal.agrupacion, Validators.required],
      cantidad: [this.animal.cantidad, Validators.required],
      fechaNacimiento: [this.animal.fechaNacimiento, [Validators.required]],
      origen: [this.animal.origen, Validators.required],
      padre: [this.animal.padre, Validators.required],
      madre: [this.animal.madre, Validators.required],
      pesoInicial: [this.animal.pesoInicial, Validators.required],
      pesoFinal: [this.animal.pesoFinal, Validators.required],
      tipoGanado: [this.animal.tipoGanado, Validators.required]
    })
  }

  get control() {
    return this.formGroup.controls;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.presentToast('Por favor complete el formulario');
      return;
    }
    this.editar();
  }

  editar() {
    this.animal = this.formGroup.value;
    this.gestionAnimalService.actualizar(this.animal.identificacion, this.animal).subscribe(a => {
      if(a!=null){
        this.router.navigate(['/consulta-animal']);
      }
    });
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}

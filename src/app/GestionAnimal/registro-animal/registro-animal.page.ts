import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonSlides, ToastController } from '@ionic/angular';
import { Animal } from 'src/app/models/animal/animal';
import { GestionAnimalService } from 'src/app/services/gestion-animal.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-registro-animal',
  templateUrl: './registro-animal.page.html',
  styleUrls: ['./registro-animal.page.scss'],
})
export class RegistroAnimalPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;
  agrupacion:string;
  activeIndex: number = 0;
  animal: Animal;
  animales: Animal[] = [];
  formGroup: FormGroup;

  constructor(private actionSheetController: ActionSheetController, private alertController: AlertController,private formBuilder: FormBuilder
    , private sqlService: SqlServiceService
    , private toastController: ToastController
    , private gestionAnimalService:GestionAnimalService
    , private router:Router) { }

  ngOnInit() {
    this.animal = new Animal();
    this.buildForm();
  }


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
    freeMode: false,
  }

  onChange(event){
    this.agrupacion = event;
    console.log(this.agrupacion);
    this.validarAgrupacion();
  }
  validarAgrupacion(){
    if(this.agrupacion=="Lote"){
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
          label:'Cantidad'
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

  buildForm() {
    this.animal = new Animal();
    this.animal.identificacion = "";
    this.animal.nombre = "";
    this.animal.agrupacion = "";
    this.animal.cantidad = 0;
    this.animal.fechaNacimiento = new Date();
    this.animal.origen = "";
    this.animal.padre = "";
    this.animal.madre = "";
    this.animal.pesoInicial = 0;
    this.animal.pesoFinal = 0;
    this.animal.tipoGanado = "";

    this.formGroup = this.formBuilder.group({
      identificacion: [this.animal.identificacion, [Validators.required, Validators.minLength(6)]],
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
    this.guardarAnimal();
  }

  guardarAnimal() {
    this.animal = this.formGroup.value;
    this.gestionAnimalService.guardar(this.animal).subscribe(a => this.animal = a);
    this.formGroup.reset();
    this.presentToast('Animal guardado exitosamente');
    this.router.navigate(['/consulta-animal']);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  
}

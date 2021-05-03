import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-editar-animal',
  templateUrl: './editar-animal.page.html',
  styleUrls: ['./editar-animal.page.scss'],
})
export class EditarAnimalPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;
  agrupacion:string;
  activeIndex: number = 0;


  constructor(private actionSheetController: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() {
    
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
}

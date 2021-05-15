import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Fitosanitario } from 'src/app/models/controlfitosanitario/fitosanitario';
import { GestionAnimalService } from 'src/app/services/gestion-animal.service';
import { GestionFitosanitarioService } from 'src/app/services/gestion-fitosanitario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  fitosanitario: Fitosanitario;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder
    , private toastController: ToastController
    , private gestionFitosanitarioService: GestionFitosanitarioService
    , private gestionAnimalService: GestionAnimalService
    , private router: Router
    , private route: ActivatedRoute
    , private alertController: AlertController
  ) { }

  ngOnInit() {
    this.fitosanitario = new Fitosanitario();
    this.contruirForm();
  }


  contruirForm() {
    var id = this.route.snapshot.paramMap.get("id");
    if(id=="sinSeleccion"){
      this.fitosanitario.animalIdentificacion = "";
    }else{
      this.fitosanitario.animalIdentificacion = id;
    }
    this.fitosanitario.dosisAplicada = "";
    this.fitosanitario.fechaAplicacion = null;
    this.fitosanitario.nombreMedicamento = "";
    this.fitosanitario.tiempoRetiro = "";
    this.fitosanitario.tipoMedicamento = "";

    this.formGroup = this.formBuilder.group({
      animalIdentificacion: [this.fitosanitario.animalIdentificacion, Validators.required],
      dosisAplicada: [this.fitosanitario.dosisAplicada, Validators.required],
      fechaAplicacion: [this.fitosanitario.fechaAplicacion, Validators.required],
      nombreMedicamento: [this.fitosanitario.nombreMedicamento, Validators.required],
      tiempoRetiro: [this.fitosanitario.tiempoRetiro],
      tipoMedicamento: [this.fitosanitario.tipoMedicamento, Validators.required]
    });

  }

  BuscarAnimal() {
    this.fitosanitario = this.formGroup.value
    this.gestionAnimalService.buscarAnimal(this.fitosanitario.animalIdentificacion).subscribe(data => {
      if (data == null) {
          this.control.animalIdentificacion.setValue("")
      }
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
    this.guardarFitosanitario();
  }

  guardarFitosanitario() {
    this.fitosanitario = this.formGroup.value;
    this.gestionFitosanitarioService.guardar(this.fitosanitario).subscribe(res => {
      if (res != null) {
        this.formGroup.reset();
        this.router.navigate(['/consulta/todos'])
      }
    })
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}

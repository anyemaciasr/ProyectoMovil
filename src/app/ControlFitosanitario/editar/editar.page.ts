import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Fitosanitario } from 'src/app/models/controlfitosanitario/fitosanitario';
import { GestionAnimalService } from 'src/app/services/gestion-animal.service';
import { GestionFitosanitarioService } from 'src/app/services/gestion-fitosanitario.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  fitosanitario: Fitosanitario;
  formGroup: FormGroup;
  id: string;
  loading: any;

  constructor(private sqlService: SqlServiceService
    , private toastController: ToastController
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private gestionFitosanitarioService: GestionFitosanitarioService
    ,private gestionAnimalService:GestionAnimalService
    , private router: Router
    , private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.fitosanitario = new Fitosanitario();
    this.buildForm(this.fitosanitario);
    this.presentLoading();
  }

  consultarFitosanitario() {
    var id = this.route.snapshot.paramMap.get("id");
    this.gestionFitosanitarioService.buscarFitosanitario(id).subscribe(c => {
      this.buildForm(c);
      this.loading.dismiss();
    });

  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando datos del registro',
      spinner: "crescent",
    });
    await this.loading.present();
    this.consultarFitosanitario();
  }

  buildForm(registoEncontrado: Fitosanitario) {
    this.fitosanitario = registoEncontrado;
    this.formGroup = this.formBuilder.group({
      animalIdentificacion: [this.fitosanitario.animalIdentificacion, Validators.required],
      codigo: [this.fitosanitario.codigo, Validators.required],
      dosisAplicada: [this.fitosanitario.dosisAplicada, Validators.required],
      fechaAplicacion: [this.fitosanitario.fechaAplicacion, Validators.required],
      nombreMedicamento: [this.fitosanitario.nombreMedicamento, Validators.required],
      tiempoRetiro: [this.fitosanitario.tiempoRetiro],
      tipoMedicamento: [this.fitosanitario.tipoMedicamento, Validators.required]
    })
  }
  BuscarAnimal() {
    this.fitosanitario = this.formGroup.value
    this.gestionAnimalService.buscarAnimal(this.fitosanitario.animalIdentificacion).subscribe(data => {
      if (data == null) {
        this.control.animalIdentificacion.setValue("")
      }
    })

  }

  editar() {
    this.fitosanitario = this.formGroup.value;

    this.gestionFitosanitarioService.actualizar(this.fitosanitario.codigo, this.fitosanitario).subscribe(p => {
      if (p != null) {
        this.router.navigate(['/consulta']);
      }
    });
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

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}

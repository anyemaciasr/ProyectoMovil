import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente/cliente';
import { GestionClientesService } from 'src/app/services/gestion-clientes.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-registo-cliente',
  templateUrl: './registo-cliente.page.html',
  styleUrls: ['./registo-cliente.page.scss'],
})
export class RegistoClientePage implements OnInit {
  cliente: Cliente;
  clientes: Cliente[] = [];
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder
    , private sqlService: SqlServiceService
    , private toastController: ToastController
    , private gestionClienteService: GestionClientesService
    , private router: Router
    , private location: Location
  ) { }

  ngOnInit() {
    this.cliente = new Cliente();
    this.buildForm();
  }

  buildForm() {
    this.cliente = new Cliente();
    this.cliente.identificacion = "";
    this.cliente.nombres = "";
    this.cliente.apellidos = "";
    this.cliente.telefono = "";
    this.cliente.correo = "";

    this.formGroup = this.formBuilder.group({
      identificacion: [this.cliente.identificacion, [Validators.required, Validators.minLength(6)]],
      nombres: [this.cliente.nombres, Validators.required],
      apellidos: [this.cliente.apellidos, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      correo: [this.cliente.correo, [Validators.required, Validators.email]]
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
    this.guardarCliente();
  }



  guardarCliente() {
    this.cliente = this.formGroup.value;
  /*  this.gestionClienteService.guardar(this.cliente).subscribe(c => {
      if(c!=null){
        this.formGroup.reset();
        this.router.navigate(['/consulta-cliente']);
      }
    }
    );*/

    this.gestionClienteService.agregarClienteFirebase(this.cliente).then(c => {
      console.log("Cliente registrado con exito", c );
      this.formGroup.reset();
      this.location.back();
    }).catch(e => {
      console.log(e);
    })

  }
  consultarCliente() {
    this.clientes = this.sqlService.clientes;
  }


  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}

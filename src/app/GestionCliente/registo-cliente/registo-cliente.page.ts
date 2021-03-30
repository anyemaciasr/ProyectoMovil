import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente/cliente';
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
  constructor(private formBuilder: FormBuilder, private sqlService: SqlServiceService, private toastController: ToastController) { }

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
      identificacion:[this.cliente.identificacion, [Validators.required, Validators.minLength(6)]],
      nombres: [this.cliente.nombres, Validators.required],
      apellidos: [this.cliente.apellidos, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      correo: [this.cliente.correo, [Validators.required,Validators.email]]
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
    console.log("Este es el mensaje de ts guaradar" + JSON.stringify(this.cliente.nombres));
    this.sqlService.guardarCliente(this.cliente).subscribe(c => {
      this.cliente = c;
      this.presentToast('Cliente guardado exitosamente');
    });
    this.consultarCliente();
    this.limpiarCampos();
  }
  consultarCliente() {
    this.clientes = this.sqlService.clientes;
  }
  limpiarCampos() {
    this.cliente.identificacion = "";
    this.cliente.nombres = "";
    this.cliente.apellidos = "";
    this.cliente.telefono = "";
    this.cliente.correo = "";
  }

  async presentToast(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}

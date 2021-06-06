import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente/cliente';
import { GestionClientesService } from 'src/app/services/gestion-clientes.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {
  cliente: Cliente;
  formGroup: FormGroup;
  id:string;
  constructor(private sqlService: SqlServiceService
    , private toastController: ToastController
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private gestionClienteService: GestionClientesService
    , private router: Router
    , private location:Location) { }

  ngOnInit() {
    this.cliente = new Cliente();
    this.buildForm(this.cliente);
    this.consultarCliente();
  }
  consultarCliente() {
    var id = this.route.snapshot.paramMap.get("id");
    // this.gestionClienteService.buscarCliente(id).subscribe(c => {
    //   this.buildForm(c);
    // });
    this.id = id
    this.gestionClienteService.obtenerClienteFirebase(id).subscribe(c => {
      console.log(c.payload.data());

      this.buildForm(c.payload.data());
    })

  }

  buildForm(clienteEncontrado?: Cliente) {
    this.cliente = clienteEncontrado
    this.formGroup = this.formBuilder.group({
      identificacion: [this.cliente.identificacion, [Validators.required, Validators.minLength(6)]],
      nombres: [this.cliente.nombres, Validators.required],
      apellidos: [this.cliente.apellidos, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      correo: [this.cliente.correo, [Validators.required, Validators.email]]
    })
  }

  buscarCliente(id: string): Cliente {
    return this.sqlService.clientes.find(p => p.identificacion == id);
  }

  editar() {
    this.cliente = this.formGroup.value;
    this.gestionClienteService.actualizarClienteFirebase(this.id, this.cliente).then(() => {
      this.formGroup.reset;
      this.location.back();
    });
    // this.gestionClienteService.actualizar(this.cliente.identificacion, this.cliente).subscribe(p => this.cliente = p);
    // this.formGroup.reset;
    // this.router.navigate(['/consulta-cliente']);
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

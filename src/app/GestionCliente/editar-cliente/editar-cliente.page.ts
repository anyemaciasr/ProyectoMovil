import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente/cliente';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {
  cliente: Cliente;
  formGroup: FormGroup;
  constructor(private sqlService: SqlServiceService
            , private toastController: ToastController
            ,private route: ActivatedRoute
            ,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cliente = new Cliente();
    var id = this.route.snapshot.paramMap.get("id");
    this.cliente = this.buscarCliente(id);
    this.buildForm(this.cliente);
  }

  buildForm(clienteEncontrado:Cliente) {
    this.cliente = clienteEncontrado

    this.formGroup = this.formBuilder.group({
      identificacion:[this.cliente.identificacion, [Validators.required, Validators.minLength(6)]],
      nombres: [this.cliente.nombres, Validators.required],
      apellidos: [this.cliente.apellidos, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      correo: [this.cliente.correo, [Validators.required,Validators.email]]
    })
  }

  buscarCliente(id:string):Cliente{
    return this.sqlService.clientes.find(p => p.identificacion==id);
  }

  editar() {
    this.cliente = this.formGroup.value;
    this.sqlService.editar(this.cliente);
    this.presentToast();
    this.formGroup.reset;
  }
 

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cliente editado exitosamente',
      duration: 2000
    });
    toast.present();
  }

  

}

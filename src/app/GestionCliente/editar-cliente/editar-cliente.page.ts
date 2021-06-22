import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente/cliente';
import { GestionClientesService } from 'src/app/services/gestion-clientes.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {
  cliente: Cliente;
  formGroup: FormGroup;
  id:string;
  loading:any;
  constructor(private sqlService: SqlServiceService
    , private toastController: ToastController
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
    , private gestionClienteService: GestionClientesService
    , private router: Router
    , private usuarioService: UsuarioService
    , private loadingController: LoadingController
    , private location:Location) { }

  ngOnInit() {
    this.usuarioService.usuarioLogueado().then(usuario =>{
      if(usuario == null){
        this.router.navigate(['/login']);
        this.cerrandoSesion();
      }
    })

    this.cliente = new Cliente();
    this.buildForm(this.cliente);
    this.presentLoading();
  }
  consultarCliente() {
    var id = this.route.snapshot.paramMap.get("id");
     this.gestionClienteService.buscarCliente(id).subscribe(c => {
       this.buildForm(c);
       this.loading.dismiss();
     });

  }
  async cerrandoSesion(){
    var loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cerrando sesion',
      spinner: "crescent",
      duration: 3000
    });
    await loading.present();
    loading.dismiss();
    window.location.reload();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando datos del animal',
      spinner: "crescent",
    });
    await this.loading.present();
    this.consultarCliente();
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

     this.gestionClienteService.actualizar(this.cliente.identificacion, this.cliente).subscribe(p => this.cliente = p);
     this.formGroup.reset;
     this.location.back();
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

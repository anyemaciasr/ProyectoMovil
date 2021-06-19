import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { GestionProductoService } from 'src/app/services/gestion-producto.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  usuario:Usuario; 
  formGroup: FormGroup;

  constructor(private actionSheetController: ActionSheetController, private alertController: AlertController,private formBuilder: FormBuilder
    , private sqlService: SqlServiceService
    , private toastController: ToastController
    , private gestionUsuarioService: UsuarioService
    , private router:Router) { }

  ngOnInit() {
    this.usuario=new Usuario();
    this.buildForm();
  }

  buildForm() {
    this.usuario=new Usuario();
    this.usuario.identificacion = "";
    this.usuario.nombres = "";
    this.usuario.apellidos = "";
    this.usuario.usuario = "";
    this.usuario.clave = "";
    this.usuario.correo = "";
    this.usuario.imagenPerfil = "";

    this.formGroup = this.formBuilder.group({
      identificacion: [this.usuario.identificacion, Validators.required],
      nombres: [this.usuario.nombres, Validators.required],
      apellidos: [this.usuario.apellidos, Validators.required],
      usuario: [this.usuario.usuario, Validators.required],
      clave: [this.usuario.clave, Validators.required],
      correo: [this.usuario.correo, Validators.required],
      imagenPerfil: [this.usuario.imagenPerfil, Validators.required],
      
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
    this.guardarUsuario();
  }

  guardarUsuario() {
    this.usuario = this.formGroup.value;
    this.gestionUsuarioService.guardar(this.usuario).subscribe(p => {
        if(p!=null){
          this.formGroup.reset();
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

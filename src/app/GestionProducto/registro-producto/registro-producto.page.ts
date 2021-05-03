import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto/producto';
import { GestionProductoService } from 'src/app/services/gestion-producto.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-registro-producto',
  templateUrl: './registro-producto.page.html',
  styleUrls: ['./registro-producto.page.scss'],
})
export class RegistroProductoPage implements OnInit {

  producto: Producto;
  productos: Producto[] = [];
  formGroup: FormGroup;

  constructor(private actionSheetController: ActionSheetController, private alertController: AlertController,private formBuilder: FormBuilder
    , private sqlService: SqlServiceService
    , private toastController: ToastController
    , private gestionProductoService:GestionProductoService
    , private router:Router) { }

  ngOnInit() {
    this.producto = new Producto();
    this.buildForm();
  }

  buildForm() {
    this.producto = new Producto();
    this.producto.nombre = "";
    this.producto.categoria = "";
    this.producto.precio = 0;
    this.producto.descripcion = "";

    this.formGroup = this.formBuilder.group({
      nombre: [this.producto.nombre, Validators.required],
      categoria: [this.producto.categoria, Validators.required],
      precio: [this.producto.precio, Validators.required],
      descripcion: [this.producto.descripcion, Validators.required]
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
    this.guardarProducto();
  }

  
  guardarProducto() {
    this.producto = this.formGroup.value;
    this.gestionProductoService.guardar(this.producto).subscribe(p => this.producto = p);
    this.formGroup.reset();
    this.presentToast('Producto guardado exitosamente');
    this.router.navigate(['/consulta-producto']);
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}

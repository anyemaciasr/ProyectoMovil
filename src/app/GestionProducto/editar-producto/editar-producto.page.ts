import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto/producto';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
  producto: Producto;
  formGroup: FormGroup;
  constructor(private sqlService: SqlServiceService
    , private toastController: ToastController
    ,private route: ActivatedRoute
    ,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.producto = new Producto();
    var id = this.route.snapshot.paramMap.get("id");
    this.buildForm(this.producto);
  }

  buildForm(productoEncontrado:Producto) {
    this.producto = productoEncontrado

    this.formGroup = this.formBuilder.group({
      codigo: [this.producto.codigo, Validators.required],
      nombre: [this.producto.nombre, Validators.required],
      categoria: [this.producto.categoria, Validators.required],
      precio: [this.producto.precio, Validators.required],
      descripcion: [this.producto.descripcion, Validators.required]
    })
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Producto editado exitosamente',
      duration: 2000
    });
    toast.present();
  }
}

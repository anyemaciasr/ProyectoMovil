import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/producto/producto';
import { GestionProductoService } from 'src/app/services/gestion-producto.service';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
})
export class EditarProductoPage implements OnInit {
  producto: Producto;
  formGroup: FormGroup;
  id:string;
  loading:any;
  constructor(private sqlService: SqlServiceService
    , private toastController: ToastController
    ,private route: ActivatedRoute
    ,private formBuilder: FormBuilder
    ,private gestionProductoService:GestionProductoService
    ,private loadingController: LoadingController
    ,private router:Router
    ) { }

  ngOnInit() {
    this.producto = new Producto();
    this.buildForm(this.producto);
    this.presentLoading();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando datos del animal',
      spinner: "crescent",
    });
    await this.loading.present();
    this.consultarProducto();
  }

  consultarProducto(){
    this.id = this.route.snapshot.paramMap.get("id");
    this.gestionProductoService.buscarProducto(Number(this.id)).subscribe(p => {
      this.buildForm(p);
      this.loading.dismiss();
    });

  }


  buildForm(productoEncontrado:Producto) {
    this.producto = productoEncontrado

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
    this.editar();
  }

  editar() {
    this.producto = this.formGroup.value;
    this.gestionProductoService.actualizar(Number(this.id),this.producto).subscribe(a =>{
      if(a!= null){
        this.router.navigate(['/consulta-producto']);
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

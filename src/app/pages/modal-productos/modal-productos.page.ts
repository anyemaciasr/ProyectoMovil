import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DetalleFactura } from 'src/app/models/factura/detalleFactura';
import { Producto, ProductoTemporal } from 'src/app/models/producto/producto';
import { GestionProductoService } from 'src/app/services/gestion-producto.service';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.page.html',
  styleUrls: ['./modal-productos.page.scss'],
})
export class ModalProductosPage implements OnInit {
  agregado: boolean = false;
  cantidad: number;
  color: string = 'Default';
  loading:any;
  constructor(private modalController: ModalController
    , private alertController: AlertController
    , private gestionProductoService:GestionProductoService
    , private loadingController:LoadingController) { }
  productos: Producto[] = [];
  productosTemp: ProductoTemporal[] = [];
  detallesFactura: DetalleFactura[] = [];

  ngOnInit() {
    this.presentLoading();
    
  }
  contruirLista(){
    this.productos.forEach(producto => {
      var productoTemp = new ProductoTemporal();
      productoTemp.codigo = producto.codigo;
      productoTemp.nombre = producto.nombre;
      productoTemp.categoria = producto.categoria;
      productoTemp.precio = producto.precio;
      productoTemp.descripcion = producto.descripcion;
      productoTemp.agregado = false;
      productoTemp.color = "Default";
      this.productosTemp.push(productoTemp);
    });
  }

  doRefresh(event) {
    this.consultar();
    event.target.complete();
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando lista de clientes',
      spinner:"crescent" 
    });
    await this.loading.present();
    this.consultar();
    await this.loading.dismiss();
  }

  consultar() {
    this.gestionProductoService.consultar().subscribe(
      datos => {
        console.log(datos);
        this.productos = datos;
        this.contruirLista();
        console.log("Datos de servidor recividos");
      }
    );
    
  }
 
  agregarDetalle(producto: Producto, cantidad: number) {
    var detalleFactura = new DetalleFactura();
    detalleFactura.idDetalle = producto.codigo;
    detalleFactura.nombre = producto.nombre;
    detalleFactura.cantidad = cantidad;
    detalleFactura.valorUnitario = producto.precio;
    detalleFactura.subTotal = detalleFactura.cantidad * producto.precio;

    this.productosTemp.map(function (dato) {
      if (dato.codigo == producto.codigo) {
        dato.agregado = true;
        dato.cantidad = cantidad;
        dato.color = "success"
      }
      return dato;
    });
    this.detallesFactura.push(detalleFactura);
  }

  quitar(producto: Producto) {

    this.productosTemp.map(function (item) {

      if (item.codigo == producto.codigo) {
        item.agregado = false;
        item.cantidad = 0;
        item.color = "Default"
      }

      return item;
    });
    var index = this.detallesFactura.findIndex(p => p.idDetalle === producto.codigo);
    this.detallesFactura.splice(index,1);
  }

  confirmarProductos() {
    this.modalController.dismiss(
      this.detallesFactura
    );
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    var lisNone=[];
    this.modalController.dismiss(lisNone);
  }

  async Mensaje() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar sin agregar',
      backdropDismiss: true,
      message:"Los productos no se agregaran a la factura",
      buttons: [
        {
          text: 'Entendito',
          cssClass: 'secondary',
          handler: () => {
            this.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  async agregar(producto: Producto) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cantidad',
      backdropDismiss: true,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',

          placeholder: 'Ingrese la cantidad'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Agregar',
          handler: (data: any) => {
            this.agregarDetalle(producto, Number(data.cantidad));
          }
        }
      ]
    });

    await alert.present();
  }


}

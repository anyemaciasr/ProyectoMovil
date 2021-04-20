import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DetalleFactura } from 'src/app/models/factura/detalleFactura';
import { Producto, ProductoTemporal } from 'src/app/models/producto/producto';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.page.html',
  styleUrls: ['./modal-productos.page.scss'],
})
export class ModalProductosPage implements OnInit {
  agregado: boolean = false;
  cantidad: number;
  constructor(private modalController: ModalController, private alertController: AlertController) { }
  productos: Producto[] = [{
    codigo: "1234",
    nombre: "carne",
    categoria: "red",
    precio: 50000,
    descripcion: "carne roja",

  },
  {
    codigo: "5050",
    nombre: "leche",
    categoria: "lacteos",
    precio: 100000,
    descripcion: "leche entera",

  },
  ];
  productosTemp: ProductoTemporal[] = [];
  detallesFactura: DetalleFactura[] = [];

  ngOnInit() {
    this.productos.forEach(producto => {
      var productoTemp = new ProductoTemporal();
      productoTemp.codigo = producto.codigo;
      productoTemp.nombre = producto.nombre;
      productoTemp.categoria = producto.categoria;
      productoTemp.precio = producto.precio;
      productoTemp.descripcion = producto.descripcion;
      productoTemp.agregado = false;
      this.productosTemp.push(productoTemp);
    });
  }

  agregar(producto: Producto) {

    var detalleFactura = new DetalleFactura();
    detalleFactura.producto = producto;
    detalleFactura.cantidad = 2;
    detalleFactura.subTotal = 2*producto.precio;

    this.productosTemp.map(function (dato) {
      if (dato.codigo == producto.codigo) {
        dato.agregado = true;
      }
      return dato;
    });
    this.detallesFactura.push(detalleFactura);
  }
  quitar() {
    this.agregado = false;
  }

  confirmarProductos() {
    this.modalController.dismiss(
      this.detallesFactura
    );
    this.modalController.dismiss();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss();
  }


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cantidad',
      inputs: [
        {
          name: 'name1',
          type: 'number',
          placeholder: 'Ingrese la cantidad'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data: any) => {
            console.log(data);
          }
        }
      ]
    });

    await alert.present();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private sqlService: SqlServiceService
            , private toastController: ToastController
            ,private route: ActivatedRoute) { }

  ngOnInit() {
    this.cliente = new Cliente();
    var id = this.route.snapshot.paramMap.get("id");
    this.cliente = this.buscarCliente(id);
  }

  buscarCliente(id:string):Cliente{
    return this.sqlService.clientes.find(p => p.identificacion==id);
  }

  editar() {
    this.sqlService.editar(this.cliente);
    this.presentToast();
    this.limpiarCampos();
  }
  limpiarCampos(){
    this.cliente.identificacion = "";
    this.cliente.nombres = "";
    this.cliente.apellidos = "";
    this.cliente.telefono = "";
    this.cliente.correo = "";
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cliente editado exitosamente',
      duration: 2000
    });
    toast.present();
  }

  

}

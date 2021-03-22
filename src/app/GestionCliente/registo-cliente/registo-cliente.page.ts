import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente/cliente';
import { SqlServiceService } from 'src/app/services/sql-service.service';

@Component({
  selector: 'app-registo-cliente',
  templateUrl: './registo-cliente.page.html',
  styleUrls: ['./registo-cliente.page.scss'],
})
export class RegistoClientePage implements OnInit {
  cliente:Cliente;
  clientes:Cliente[]=[];
  constructor(private sqlService:SqlServiceService, private toastController:ToastController) { }

  ngOnInit() {
    this.cliente=new Cliente();
  }

  guardarCliente(){
    console.log("Este es el mensaje de ts guaradar"+JSON.stringify(this.cliente.nombres));
    this.sqlService.guardarCliente(this.cliente).subscribe(c => {
      this.cliente = c;
      this.presentToast();
    });
    this.consultarCliente();
    this.limpiarCampos();
  }
  consultarCliente(){
    this.clientes = this.sqlService.clientes;
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
      message: 'Cliente guardado exitosamente',
      duration: 2000
    });
    toast.present();
  }
  
}

import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Cliente } from 'src/app/models/cliente/cliente';
import { GestionClientesService } from 'src/app/services/gestion-clientes.service';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.page.html',
  styleUrls: ['./modal-clientes.page.scss'],
})
export class ModalClientesPage implements OnInit {
clientes:Cliente[]=[];
loading:any;
textoABuscar:string;
  constructor(private gestionClientesService:GestionClientesService, private loadingController:LoadingController
    , private modalController:ModalController) { }

  ngOnInit() {
    this.presentLoading();
  }
  doRefresh(event) {
    this.consultar();
    event.target.complete();
  }
  consultar() {
    this.gestionClientesService.consultar().subscribe(
      datos => {
        console.log(datos);
        this.clientes = datos;
        this.loading.dismiss();
        console.log("Datos de servidor recividos");
      }
    );

  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando lista de clientes',
      spinner:"crescent"
    });
    await this.loading.present();
    this.consultar();

  }


  opciones(cliente: Cliente) {
    console.log(cliente);
    this.modalController.dismiss(
      cliente
    );
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss( new Cliente());
  }
}

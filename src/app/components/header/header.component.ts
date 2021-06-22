import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string="";
  @Output() cambiarEstado = new EventEmitter<boolean>();
  constructor(private router:Router, private usuarioService: UsuarioService, private loadingController:LoadingController) { }

  ngOnInit() {}
  redirecionar(){
    this.usuarioService.logueado = false;
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/login']);
    this.cerrandoSesion()
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

  cambiar(){
    this.cambiarEstado.emit(true);
    this.usuarioService.logueado = false;
  }

}

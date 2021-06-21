import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, UsuarioL } from 'src/app/models/Usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Output() cambiarEstado = new EventEmitter<boolean>();
  constructor(private router: Router, private usuarioService:UsuarioService) { }
  usuario: UsuarioL
  ngOnInit() {
    this.usuario = new UsuarioL();
  }

  redireccion(){
    this.usuarioService.login(this.usuario).subscribe(usu => {
      console.log(usu);
      if(usu != null){
        this.router.navigate(['/consulta-cliente']);
        this.usuario = new UsuarioL();
        this.usuarioService.logueado = true;
      }
    })

  }

  estado(){
    this.cambiarEstado.emit(true);
    this.usuarioService.logueado = true;
  }

}

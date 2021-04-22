import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario/usuario';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  usuario:Usuario;
  constructor() { }

  ngOnInit() {
  }

}

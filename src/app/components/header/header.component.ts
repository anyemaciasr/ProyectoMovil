import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string="";
  @Output() cambiarEstado = new EventEmitter<boolean>();
  constructor(private router:Router, private usuarioService: UsuarioService) { }

  ngOnInit() {}
  redirecionar(){
    this.usuarioService.logueado = false;
    this.router.navigate(['/login']);
  }
  cambiar(){
    this.cambiarEstado.emit(true);
    this.usuarioService.logueado = false;
  }

}

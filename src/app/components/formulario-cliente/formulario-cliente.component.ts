import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente/cliente';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss'],
})
export class FormularioClienteComponent implements OnInit {

  cliente:Cliente
  constructor() { }
  @Input() titulo:string="";
  @Input() boton:string="";

  ngOnInit() {
    this.cliente = new Cliente();
  }

}

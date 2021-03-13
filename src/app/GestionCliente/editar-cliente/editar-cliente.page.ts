import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente/cliente';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.page.html',
  styleUrls: ['./editar-cliente.page.scss'],
})
export class EditarClientePage implements OnInit {
  cliente:Cliente;
  constructor() { }

  ngOnInit() {
    this.cliente=new Cliente();
  }

}

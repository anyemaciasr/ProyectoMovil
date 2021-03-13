import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente/cliente';

@Component({
  selector: 'app-registo-cliente',
  templateUrl: './registo-cliente.page.html',
  styleUrls: ['./registo-cliente.page.scss'],
})
export class RegistoClientePage implements OnInit {
  cliente:Cliente;
  constructor() { }

  ngOnInit() {
    this.cliente=new Cliente();
  }

}

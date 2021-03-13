import { Component, OnInit } from '@angular/core';
import { Fitosanitario } from 'src/app/models/controlfitosanitario/fitosanitario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  fitosanitario:Fitosanitario;
  constructor() { }

  ngOnInit() {
    this.fitosanitario=new Fitosanitario();
  }

}

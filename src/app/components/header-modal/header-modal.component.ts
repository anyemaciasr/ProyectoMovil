import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {
  @Input() titulo: string="";
  @Input() ruta: string="";
  constructor(private router:Router) { }

  ngOnInit() {}

  redireccionar(){
    this.router.navigate([this.ruta]);
  }
}

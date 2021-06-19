import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string="";
  constructor(private router:Router) { }

  ngOnInit() {}
  redirecionar(){
    this.router.navigate(['/registrar']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  LoginService
} from '../../services/services.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public loginService:LoginService, private route:Router) { }

  ngOnInit(): void {
  }


  logout(){
    localStorage.removeItem('usuario');
    //this.breadcrumbsService.usuario = null;
    this.route.navigate(['/login']);

  }

}

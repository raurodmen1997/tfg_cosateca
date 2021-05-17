import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthService,
  LoginService,
  ModalService
} from '../../services/services.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService, private route:Router, private modalService:ModalService) { }


  ngOnInit(): void {
  }


  logout(){
    this.authService.logout();
    this.route.navigate(['/login']);
  }



  abreModalPerfil(){
    this.modalService.abreModalPerfil = true;
  }
}

import { Component, OnInit } from '@angular/core';

import {
  LoginService
} from '../../services/services.index';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
  ]
})
export class InicioComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    console.log(this.loginService.isLogged());
  }

}

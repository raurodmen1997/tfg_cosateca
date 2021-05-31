import { Component, OnInit } from '@angular/core';

import {
  AuthService,
  AyuntamientoService,
  LoginService
} from '../../services/services.index';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
  ]
})
export class InicioComponent implements OnInit {

  public infoAyuntamiento:any;

  center = {lat: 24, lng: 12};
  zoom = 15;

  codigos_postales:string = '';

  constructor(private loginService:LoginService, private ayuntamientoService:AyuntamientoService, public authService:AuthService) { }

  ngOnInit(): void {

    this.ayuntamientoService.obtenerInfoAyuntamiento().subscribe(resultado=>{
      console.log(resultado);
      for(let i = 0; i<resultado.codigos_postales.length; i++){
        if(i === resultado.codigos_postales.length - 1){
          this.codigos_postales = this.codigos_postales + resultado.codigos_postales[i];
        }else{
          this.codigos_postales = this.codigos_postales + resultado.codigos_postales[i] + ", ";
        }     
      }
      this.infoAyuntamiento = resultado;
    });
    
  }

}

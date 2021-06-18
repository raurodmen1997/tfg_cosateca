import { Component, OnInit } from '@angular/core';
import { AyuntamientoService, ModalService } from '../services/services.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  infoAyuntamiento:any;

  constructor(public modalService:ModalService, private ayuntamientoService:AyuntamientoService) { }

  ngOnInit() {

    this.ayuntamientoService.obtenerInfoAyuntamiento().subscribe(resultado=>{
      console.log(resultado);
      //this.authService.guardarCodigosPostales(resultado.codigos_postales);
      /*
      for(let i = 0; i<resultado.codigos_postales.length; i++){
        if(i === resultado.codigos_postales.length - 1){
          this.codigos_postales = this.codigos_postales + resultado.codigos_postales[i];
        }else{
          this.codigos_postales = this.codigos_postales + resultado.codigos_postales[i] + ", ";
        }     
      }
      */
      this.infoAyuntamiento = resultado;
    });

  }

}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService, ValoracionService } from 'src/app/services/services.index';

@Component({
  selector: 'app-herramienta',
  templateUrl: './herramienta.component.html',
  styles: [
  ]
})
export class HerramientaComponent implements OnInit {


  @Input() objeto: any;
  valoracionMedia:any;
  numeroValoraciones:any;

  @Output() evento_objeto_id = new EventEmitter<number>();
  
  constructor(private valoracionesService:ValoracionService, public authService:AuthService) { }

  ngOnInit(): void {

    /*
    this.valoracionesService.getValoracionesObjeto(this.objeto.id).subscribe(valoraciones=>{
      this.numeroValoraciones = valoraciones.length;
    })
*/
    this.valoracionesService.getValoracionMediaObjeto(this.objeto.id).subscribe(valoracionMedia=>{
      this.valoracionMedia = valoracionMedia;
    });
  }



  eliminarObjetoListaFavorito(objeto:any){
    this.evento_objeto_id.emit(objeto.id);
  }

}

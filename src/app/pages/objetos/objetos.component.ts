import { Component, OnInit } from '@angular/core';
import { ComunService, ObjetoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styles: [
  ]
})
export class ObjetosComponent implements OnInit {

  objetos:any[] = [];
  pagina:string = "objetos";

  constructor(private objetoService:ObjetoService, public comunService:ComunService) { }

  ngOnInit(): void {

    this.objetoService.getObjetos().subscribe(objetos=>{
      this.objetos = objetos;
    });
  }

}

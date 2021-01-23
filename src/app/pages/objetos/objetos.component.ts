import { Component, OnInit } from '@angular/core';
import { ObjetoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-objetos',
  templateUrl: './objetos.component.html',
  styles: [
  ]
})
export class ObjetosComponent implements OnInit {

  objetos:any[] = [];

  constructor(private objetoService:ObjetoService) { }

  ngOnInit(): void {

    this.objetoService.getObjetos().subscribe(objetos=>{
      this.objetos = objetos;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunService, ObjetoService, ValoracionService } from 'src/app/services/services.index';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  objeto_id:any = null; 
  objeto:any;
  valoracionesObjeto:Array<any> = new Array();

  totalStars:number = 5;
  readOnly:boolean = false;

  pagina:string = "detalle-objeto";

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private objetoService:ObjetoService,
    private valoracionService:ValoracionService,
    public comunService:ComunService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(param =>{

      if(param.has('objeto_id')){
        this.objeto_id = parseInt(param.get("objeto_id")!, 10);
        this.objetoService.getObjetoPorId(parseInt(param.get("objeto_id")!, 10)).subscribe(objeto=>{

          this.objeto = objeto;
          console.log(objeto);

          this.valoracionService.getValoracionesObjeto(this.objeto_id).subscribe(valoraciones=>{
            this.valoracionesObjeto = valoraciones;
            console.log(valoraciones);

            this.valoracionService.getValoracionMediaObjeto(this.objeto_id).subscribe(valoracionMedia=>{
              console.log(valoracionMedia);
            })
          });        
        });
      }

    });


  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunService, ListaFavoritoService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-objetos-lista-favorito',
  templateUrl: './objetos-lista-favorito.component.html',
  styles: [
  ]
})
export class ObjetosListaFavoritoComponent implements OnInit {

  listaFavorito:any;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public comunService:ComunService,
    private listaFavoritoService:ListaFavoritoService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(param =>{

      if(param.has('lista_id')){
        this.listaFavoritoService.getListaFavoritoById(parseInt(param.get("lista_id")!, 10)).subscribe(lista=>{
          this.listaFavorito = lista;
          console.log(lista);
        });
      }

    })

  }



  eliminarObjeto(event:any){
    console.log(event);
    Swal.fire({
      title: `¿Está seguro de querer eliminar el objeto seleccionado?`,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){

        this.listaFavoritoService.deleteObjetoListaFavorito(Number(this.listaFavorito.id), Number(event)).subscribe(resultado=>{
          let objetos:any[] = this.listaFavorito.objetos;
          objetos = objetos.filter(obj => obj.id !== event);
          this.listaFavorito.objetos = objetos;
          if(objetos.length === 0){
            this.router.navigateByUrl('listas-favorito');
          }
          swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
        });
      }
    })

  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, ComunService, ListaFavoritoService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-lista-favotiro',
  templateUrl: './lista-favotiro.component.html',
  styleUrls: ['./lista-favorito.component.scss']
})
export class ListaFavotiroComponent implements OnInit {


  public listaFavorito:any[] = [];

  constructor(private listaFavoritoService:ListaFavoritoService,
              private activatedRoute: ActivatedRoute, public comunService:ComunService, private authService:AuthService) { }

  ngOnInit(): void {

    //this.activatedRoute.paramMap.subscribe(param =>{
      //if(param.has('usuario_id')){
        //parseInt(param.get("usuario_id")!, 10)
        this.listaFavoritoService.getListaFavoritoByUser(this.authService.usuario.id).subscribe(listasFavorito=>{
          this.listaFavorito = listasFavorito;
          console.log(listasFavorito);
        });
      //}
    //})

  }



  /**
   * Elimina la lista.
   * @param lista Lista que vamos a eliminar
   */
  eliminarLista(lista:any){
    Swal.fire({
      title: `¿Está seguro de querer eliminar la lista '${lista.nombre}'?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Eliminar`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){

        this.listaFavoritoService.deleteLista(lista.id).subscribe(result=>{
          this.listaFavorito = this.listaFavorito.filter(lis => lis.id !== lista.id);
          Swal.fire('Operación realizada correctamente.', result.mensaje, 'success');
        })
      }

    })

  }


  /**
   * Actualiza el nombre de la lista.
   * @param lista Lista que se va a editar
   */
  editarListaFavorito(lista:any){
      
      swal.fire({
        title: `Edición de la lista '${lista.nombre}'`,
        input: 'text',
        inputValue: '',
        inputLabel: 'Nombre de la lista',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: `Modificar`,
        cancelButtonColor: '#d33',
        icon: 'warning',       
        preConfirm: (value) => {
          if (value === '') {
            Swal.showValidationMessage("Debe establecer un nombre.")
          }
        }
        
      }).then((result) => {
        
        if(result.isConfirmed){
          let listaCopia = lista;
          listaCopia.nombre = result.value;
          this.listaFavoritoService.guardarListaFavorito(listaCopia, listaCopia.id).subscribe(resultado => {
            lista.nombre = result.value;
            Swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
          });
        }

      });
      

    
      
     

  }

  
  /**
   * Añade una nueva lista de favorito indicando el nombre de la lista a insertar.
   */
  nuevaListaFavorito(){

    swal.fire({
      title: 'Creación de lista.',
      input: 'text',
      inputValue: '',
      inputLabel: 'Nombre de la lista',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Guardar`,
      cancelButtonColor: '#d33',
      icon: 'warning',       
      preConfirm: (value) => {
        if (value === '') {
          Swal.showValidationMessage("Debe establecer un nombre.")
        }
      }
      
    }).then((result) => {
      
      if(result.isConfirmed){
        let lista:any = {
          nombre: result.value,
          usuario: this.authService.usuario
        }

        this.listaFavoritoService.guardarListaFavorito(lista, null!).subscribe(resultado => {
          this.listaFavorito.push(resultado.lista_favorito);
          Swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
        });
      }

    });

  }

}

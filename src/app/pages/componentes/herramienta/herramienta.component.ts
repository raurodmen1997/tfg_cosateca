import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService, ListaFavoritoService, ValoracionService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';

@Component({
  selector: 'app-herramienta',
  templateUrl: './herramienta.component.html',
  styleUrls: ['./herramienta.component.scss']
})
export class HerramientaComponent implements OnInit {


  @Input() objeto: any;
  @Input() pagina: any;
  valoracionMedia:any;
  numeroValoraciones:any;

  @Output() evento_objeto_id = new EventEmitter<number>();
  
  constructor(private valoracionesService:ValoracionService, public authService:AuthService, private listaFavoritoService:ListaFavoritoService) { }

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

  anadirA(objeto_id:number){
    this.listaFavoritoService.getListaFavoritoByUser(this.authService.usuario.id).subscribe(listas=>{
      console.log(listas);
      if(listas.length !== 0){

        let opciones = new Map();
        for (let value of listas) {
          opciones.set(value.id, `${value.nombre}`);        
        }

        swal.fire({
          title: 'Listas de favorito del usuario.',
          text: 'Seleccione la lista de favorito donde quiera añadir el objeto.',
          input: 'select',
          inputOptions: opciones,
          showCancelButton: true,
          confirmButtonText: `Aceptar`,
          cancelButtonColor: '#d33',
          icon: 'warning'   
        }).then((result) => {
    
          if(result.isConfirmed){
            this.listaFavoritoService.guardarObjetoEnListaFavorito(result.value, objeto_id).subscribe(resultado=>{
              console.log(resultado);
              swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
            });
          }
        });

      }else{

        swal.fire({
          title: 'Listas de favorito del usuario.',
          text: "Aún no tiene creada ninguna lista de favorito. ¿Desea guardar el objeto en la lista de favorito 'favoritos'? El sistema creará automáticamente la lista por usted.",
          showCancelButton: true,
          confirmButtonText: `Aceptar`,
          cancelButtonColor: '#d33',
          icon: 'warning'   
        }).then((result) => {

          if(result.isConfirmed){
            let lista:any = {
              nombre: 'favoritos',
              usuario: this.authService.usuario
            }
            this.listaFavoritoService.guardarListaFavorito(lista, null!).subscribe(resultado_guardar_lista=>{
              console.log(resultado_guardar_lista);          
              this.listaFavoritoService.guardarObjetoEnListaFavorito(resultado_guardar_lista.lista_favorito.id, objeto_id).subscribe(resultado_guardar_objeto=>{
                swal.fire('Operación realizada correctamente.', resultado_guardar_objeto.mensaje, 'success');
              });
            });

          }

        });


      }

    })

    

    /*
    const { value: fruit } = await Swal.fire({
      title: 'Select field validation',
      input: 'select',
      inputOptions: {
        'Fruits': {
          apples: 'Apples',
          bananas: 'Bananas',
          grapes: 'Grapes',
          oranges: 'Oranges'
        },
        'Vegetables': {
          potato: 'Potato',
          broccoli: 'Broccoli',
          carrot: 'Carrot'
        },
        'icecream': 'Ice cream'
      },
      inputPlaceholder: 'Select a fruit',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === 'oranges') {
            resolve()
          } else {
            resolve('You need to select oranges :)')
          }
        })
      }
    })
    */

  }

}

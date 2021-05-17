import { Component, OnInit } from '@angular/core';
import { AuthService, ComunService, ValoracionService } from 'src/app/services/services.index';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.scss']
})
export class ValoracionesComponent implements OnInit {

  valoraciones:any[] = [];

  constructor(private valoracionService:ValoracionService, private authService:AuthService, public comunService:ComunService) { }

  ngOnInit(): void {
    this.valoracionService.getValoracionesUsuario(this.authService.usuario.id).subscribe(valoraciones=>{
      this.valoraciones = valoraciones;
      console.log(valoraciones);
    })
  }


  eliminarValoracion(valoracion_id:number){
    console.log(valoracion_id);
    Swal.fire({
      title: '¿Está seguro de querer eliminar la valoración seleccionada?',
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning',
    }).then((result) => {

      if (result.isConfirmed) {
        this.valoracionService.deleteValoracion(valoracion_id).subscribe(resultado=>{
          this.valoraciones = this.valoraciones.filter(val => val.id !== valoracion_id);
          swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
        })
      }

    });

  } 

}

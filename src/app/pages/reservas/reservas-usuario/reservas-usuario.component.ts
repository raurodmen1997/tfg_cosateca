import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ComunService, ReservasUserService} from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas-usuario',
  templateUrl: './reservas-usuario.component.html',
  styles: [
  ]
})
export class ReservasUsuarioComponent implements OnInit {

  public peticionesReserva:any[] = [];
  paginador: any;
  url:any;
  constructor(private peticionesReservaService:ReservasUserService, 
              private activatedRoute: ActivatedRoute, 
              private authService:AuthService,
              public comunService:ComunService,
              private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) {
        page = 0;
      }

      this.peticionesReservaService.getPeticionesReservaByUser(page, this.authService.usuario.id).subscribe(response=>{
        
        console.log(this.peticionesReserva);
        if(page >= response.totalPages){
          this.router.navigate(['/reservas-usuario']);
        }else{
          this.peticionesReserva = response.content;
          this.paginador = response;
          this.url = '/reservas-usuario/page';
        }
        
      });

    });

  }

  
  /**
   * Muestra la imagen de la petición de donación pasada por parámetro.
   * @param peticionDonacion Petición de donación
   */
   verImagen(peticion_reserva:any){
    let imagenCamara = `data:image/png;base64,${peticion_reserva.objeto.imagen.bytes}`;
    Swal.fire({
      imageUrl: imagenCamara
    });
  }

}

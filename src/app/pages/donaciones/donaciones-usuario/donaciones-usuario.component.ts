import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ComunService, DonacionesUsuarioService, PeticionDonacionService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donaciones-usuario',
  templateUrl: './donaciones-usuario.component.html',
  styles: [
  ]
})
export class DonacionesUsuarioComponent implements OnInit {


  public peticionesDonacion:any[] = [];
  paginador: any;
  url:any;

  constructor(private activatedRoute: ActivatedRoute, 
              public comunService:ComunService, 
              private donacionesUsuario:DonacionesUsuarioService, 
              private authService:AuthService,
              private router:Router) { }



  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) {
        page = 0;
      }

      this.donacionesUsuario.getPeticionesDonacionByUser(page, this.authService.usuario.id).subscribe(response=>{
        
        console.log(this.peticionesDonacion);
        if(page >= response.totalPages){
          this.router.navigate(['/donaciones-usuario']);
        }else{
          this.peticionesDonacion = response.content;
          this.paginador = response;
          this.url = '/donaciones-usuario/page';
        }
       
      });

    });


  }


  /**
   * Muestra la imagen de la petición de donación pasada por parámetro.
   * @param peticionDonacion Petición de donación
   */
  verImagen(peticionDonacion:any){
    let imagenCamara = `data:image/png;base64,${peticionDonacion.imagen.bytes}`;
    Swal.fire({
      imageUrl: imagenCamara
    });
  }

}

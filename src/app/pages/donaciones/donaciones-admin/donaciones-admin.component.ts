import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunService, DonacionesAdminService, DonacionesUsuarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-donaciones-admin',
  templateUrl: './donaciones-admin.component.html',
  styles: [
  ]
})
export class DonacionesAdminComponent implements OnInit {

  public peticionesDonacionAdmin:any[] = [];
  paginador: any;
  url:any;


  constructor(private activatedRoute: ActivatedRoute, 
              public comunService:ComunService, 
              private donacionesAdminService:DonacionesAdminService,
              private router:Router) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) {
        page = 0;
      }
      this.donacionesAdminService.getPeticionesPendientesDeRevision(page).subscribe(response=>{
        
        console.log(this.peticionesDonacionAdmin);
        if(page >= response.totalPages){
          this.router.navigate(['/donaciones-admin']);
        }else{
          this.peticionesDonacionAdmin = response.content;
          this.paginador = response;
          this.url = '/donaciones-admin/page';
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


  /**
   * Acepta la petición de donación y crea el objeto automaticamente.
   * @param peticionDOnacion Petición de donación a aceptar
   */
  aceptar(peticionDonacion:any){
    Swal.fire({
      title: 'Aceptar petición de donación.',
      text: `¿Está seguro de querer aceptar la petición de donación seleccionada? Se añadirá a la lista de objetos
      en el caso de aceptarla.`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){
        this.donacionesAdminService.aceptarPeticionDonacion(peticionDonacion.id).subscribe(resultado =>{
          this.peticionesDonacionAdmin = this.peticionesDonacionAdmin.filter(peti => peti.id !== peticionDonacion.id);
          Swal.fire('Operación realizada con éxito.', resultado.mensaje, 'success');
        });
      }
    });
  }




  /**
   * Rechaza la petición de donación.
   * @param peticionDonacion Petición de donación a rechazar
   */
  rechazar(peticionDonacion:any){

    Swal.fire({
      title: 'Rechazar petición de donación.',
      text: `¿Está seguro de querer rechazar la petición de donación seleccionada?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){
        this.donacionesAdminService.rechazarPeticionDonacion(peticionDonacion.id).subscribe(resultado =>{
          this.peticionesDonacionAdmin = this.peticionesDonacionAdmin.filter(peti => peti.id !== peticionDonacion.id);
          Swal.fire('Operación realizada con éxito.', resultado.mensaje, 'success');
        });

      }

    });

  }




}

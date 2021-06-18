import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, ComunService, ReservasAdminService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas-admin',
  templateUrl: './reservas-admin.component.html',
  styles: [
  ]
})
export class ReservasAdminComponent implements OnInit{

  public peticionesReserva:any[] = [];
  paginador: any;
  url:any;

  form:FormGroup;
  nPage:any;

  constructor(private peticionesReservaService:ReservasAdminService, 
    private activatedRoute: ActivatedRoute, 
    private authService:AuthService,
    public comunService:ComunService,
    private router:Router,
    private fb:FormBuilder) { 
      this.form = this.fb.group({
        codigo_identificacion: new FormControl(''),    
      });
    }



  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;
      this.nPage = page;

      if (!page) {
        page = 0;
      }

      if(sessionStorage.getItem("peticiones_reserva_usuario")){
        this.form.get('codigo_identificacion')?.setValue(sessionStorage.getItem('codigo_identificacion_busqueda'));
        this.peticionesReservaService.getPeticionesReservaPorUsuario(sessionStorage.getItem('codigo_identificacion_busqueda'), page).subscribe(response=>{
          this.peticionesReserva = response.content;
          console.log(this.peticionesReserva);
          if(page >= response.totalPages){
            this.router.navigate(['/reservas-admin']);
          }else{
            this.peticionesReserva = response.content;
            this.paginador = response;
            this.url = '/reservas-admin/page';
          }
        });

      }else{

        this.peticionesReservaService.getPeticionesReserva(page).subscribe(response=>{
          this.peticionesReserva = response.content;
          console.log(this.peticionesReserva);
          if(page >= response.totalPages){
            this.router.navigate(['/reservas-admin']);
          }else{
            this.peticionesReserva = response.content;
            this.paginador = response;
            this.url = '/reservas-admin/page';
          }
          
        });

      }

      

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



  /**
   * Entrega la herramienta y cambia el estado de la petición de reserva a "EN_PORPIEDAD".
   * @param peticion_reserva Peticioón de reserva a la que se le va a cambiar el estado a "EN_PROPIEDAD"
   */
  entregarHerramienta(peticion_reserva:any){

    Swal.fire({
      title: 'Entregar reserva.',
      text: `¿Está seguro de querer entregar la herramienta seleccionada?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){
        this.peticionesReservaService.entregarReserva(peticion_reserva.id).subscribe(resultado =>{
          peticion_reserva.estado = resultado.peticionReserva.estado;
          //this. = this.peticionesDonacionAdmin.filter(peti => peti.id !== peticionDonacion.id);
          Swal.fire('Operación realizada con éxito.', resultado.mensaje, 'success');
        });

      }

    });

  }



  /**
   * Finaliza la reserva y cambia el estado de la petición de reserva a "FINALIZADA".
   * @param peticion_reserva Peticioón de reserva a la que se le va a cambiar el estado a "FINALIZADA"
   */
  finalizarReserva(peticion_reserva:any){

    Swal.fire({
      title: 'Finalizar reserva.',
      text: `¿Está seguro de querer finalizar la reserva seleccionada?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){
        this.peticionesReservaService.finalizarReserva(peticion_reserva.id).subscribe(resultado =>{
          peticion_reserva.estado = resultado.peticionReserva.estado;
          //this. = this.peticionesDonacionAdmin.filter(peti => peti.id !== peticionDonacion.id);
          Swal.fire('Operación realizada con éxito.', resultado.mensaje, 'success');
        });

      }

    });

  }

  onSubmit(){

    this.peticionesReservaService.getPeticionesReservaPorUsuario(this.form.get('codigo_identificacion')?.value, 0).subscribe(response=>{
      this.peticionesReserva = response.content;
      this.paginador = response;
      sessionStorage.setItem('peticiones_reserva_usuario', JSON.stringify(this.peticionesReserva));   
      sessionStorage.setItem('codigo_identificacion_busqueda', this.form.get('codigo_identificacion')?.value);   
    });

  }


  limpiarForm(){
    console.log('limpiar');
    this.form.reset();
    sessionStorage.removeItem('peticiones_reserva_usuario');
    sessionStorage.removeItem('codigo_identificacion_busqueda');
    this.peticionesReservaService.getPeticionesReserva(0).subscribe(response=>{
      this.peticionesReserva = response.content;
      this.paginador = response;
      this.router.navigate(['/reservas-admin']);
     
    });
  }
}

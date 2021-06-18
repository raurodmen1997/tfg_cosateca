import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from '../services.index';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReservasAdminService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/peticionesReserva';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router, private tokenService: TokenService) { }




    getPeticionesReserva(page:any){
      return this.http.get(`${this.urlEndPoint}/page/${page}`, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener las peticiones de reserva.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }


    getPeticionesReservaPorUsuario(codigo_identificacion:any, page:any){
      return this.http.get(`${this.urlEndPoint}/usuarioCodigo/${codigo_identificacion}/page/${page}`, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener las peticiones de reserva del usuario.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }


    
    entregarReserva(peticion_id: number){
      return this.http.put(`${this.urlEndPoint}/entregarPeticion/${peticion_id}`, null, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.error(e.error.error);
          swal.fire('Error al entregar la reserva.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }


    finalizarReserva(peticion_id: number){
      return this.http.put(`${this.urlEndPoint}/finalizarPeticion/${peticion_id}`, null, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.error(e.error.error);
          swal.fire('Error al finalizar la reserva.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }


    



}





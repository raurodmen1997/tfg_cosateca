import { HttpClient, HttpHeaders } from '@angular/common/http';
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
export class ReservasUserService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/peticionesReserva';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router, private tokenService: TokenService) { }




    guardarPeticionReserva(peticionReserva:any){
      return this.http.post(this.urlEndPoint, peticionReserva, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.error(e.error.error);
          swal.fire('Error al crear una petición de reserva.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }











    
    getPeticionesReservaByUser(page:any, usuario_id:any){
      return this.http.get(`${this.urlEndPoint}/usuario/${usuario_id}/page/${page}`, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
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


    getPeticionesReservaObjeto(objeto_id:any){
      return this.http.get(`${this.urlEndPoint}/objeto/${objeto_id}`, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener las peticiones de reserva de la herramienta.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }

}

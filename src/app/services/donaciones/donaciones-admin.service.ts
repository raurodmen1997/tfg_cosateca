import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class DonacionesAdminService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/peticionesDonaciones';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  

  constructor(private http: HttpClient,
    private router:Router, private tokenService:TokenService) { }



  getPeticionesPendientesDeRevision(page:any){
    return this.http.get(`${this.urlEndPoint}/pendientes/page/${page}`, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
      map(response => response as any),
      catchError(e =>{

        if (this.tokenService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.log(e);
        console.error(e.message);
        swal.fire('Error al obtener las peticiones de donación.', `${e.message}`, 'error');
        return throwError(e);
      })
    )
  
  }


  aceptarPeticionDonacion(peticionDonacion_id:any){
    return this.http.put(`${this.urlEndPoint}/aceptar/${peticionDonacion_id}`, null, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
      map(response => response as any),
      catchError(e =>{

        if (this.tokenService.isNoAutorizado(e)) {
          return throwError(e);
        }
        
        console.error(e.error.error);
        swal.fire('Error al aceptar la petición de donación.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }








  


  rechazarPeticionDonacion(peticionDonacion_id:any){
    return this.http.put(`${this.urlEndPoint}/rechazar/${peticionDonacion_id}`, null, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
      map(response => response as any),
      catchError(e =>{

        if (this.tokenService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.error);
        swal.fire('Error al rechazar la petición de donación.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }


}

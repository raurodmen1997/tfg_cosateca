import { HttpClient } from '@angular/common/http';
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
export class CuentaService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/cuentas';
  

  constructor(private http: HttpClient,
    private router:Router, private tokenService:TokenService) { }




    getCuentaById(cuenta_id: number){
      return this.http.get(`${this.urlEndPoint}/${cuenta_id}`, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.error(e.error.mensaje);
          swal.fire('Error al obtener la cuenta.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      )
    }


    actualizarCuenta(cuenta: any, cuenta_id:number){

      return this.http.put(`${this.urlEndPoint}/${cuenta_id}`, cuenta, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
          map(response => response as any),
          catchError(e =>{
  
            if (this.tokenService.isNoAutorizado(e)) {
              return throwError(e);
            }
  
            console.error(e.error.error);
            swal.fire('Error al actualizar la cuenta.', `${e.error.mensaje}`, 'error');
            return throwError(e);
          })
        );
  
    }


}

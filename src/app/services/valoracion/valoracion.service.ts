import { HttpHeaders, HttpClient } from '@angular/common/http';
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
export class ValoracionService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/valoraciones';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router, private tokenService:TokenService) { }




    getValoracionPorId(valoracion_id:number){
      return this.http.get(`${this.urlEndPoint}/${valoracion_id}`, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener las valoraciones del objeto.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      )
    
    }


    getValoracionesObjeto(objeto_id:number){
      return this.http.get(`${this.urlEndPoint}/objeto/${objeto_id}`).pipe(
        map(response => response as any),
        catchError(e =>{
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener las valoraciones del objeto.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      )
    
    }


    getValoracionesUsuario(usuario_id:number){
      return this.http.get(`${this.urlEndPoint}/usuario/${usuario_id}`, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener las valoraciones del usuario.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      )
    
    }


    deleteValoracion(valoracion_id: number){
      return this.http.delete(`${this.urlEndPoint}/${valoracion_id}`, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.error(e.error.mensaje);
          swal.fire('Error al intentar eliminar una valoración.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }


    getValoracionMediaObjeto(objeto_id:number){
      return this.http.get(`${this.urlEndPoint}/objeto/media/${objeto_id}`).pipe(
        map(response => response as any),
        catchError(e =>{
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener la valoración media del objeto.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      )
    
    }


    actualizarValoracion(valoracion_id: number, valoracion:any){
      return this.http.put(`${this.urlEndPoint}/${valoracion_id}`, valoracion, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.error(e.error.error);
          swal.fire('Error al actualizar la valoración.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }

    crearValoracion(valoracion:any){
      return this.http.post(`${this.urlEndPoint}`, valoracion, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.error(e.error.error);
          swal.fire('Error al crear la valoración.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }


    
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { TokenService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/objetos';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router, private tokenService: TokenService) { }


    getObjetosAccesibles(){
      return this.http.get(`${this.urlEndPoint}/accesibles`).pipe(
        map(response => response as any),
        catchError(e =>{
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener los objetos accesibles.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }

    getObjetosPorCategoriaAccesible(categoria:any){
      return this.http.get(`${this.urlEndPoint}/categoria/${categoria}`).pipe(
        map(response => response as any),
        catchError(e =>{
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener los objetos por categoría.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }


    getObjetosPorCategoriaAdmin(categoria:any){
      return this.http.get(`${this.urlEndPoint}/admin/categoria/${categoria}`, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener los objetos por categoría.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }


    getObjetosInaccesibles(){
      return this.http.get(`${this.urlEndPoint}/inaccesibles`, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener los objetos inaccesibles.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }


    getObjetosPorCategoriaYAccesibilidad(categoria:any, accesible:boolean){
      return this.http.get(`${this.urlEndPoint}/admin/categoria/${categoria}/accesible/${accesible}`, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener los objetos por categoría y accesibilidad.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }


    getObjetos(){
      return this.http.get(`${this.urlEndPoint}`, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener los objetos.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }


    getObjetoPorId(objeto_id: number){
      return this.http.get(`${this.urlEndPoint}/${objeto_id}`).pipe(
        map(response => response as any),
        catchError(e =>{
          console.error(e.error.mensaje);
          swal.fire('Error al obtener el objeto.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      )
    }


    inhabilitarObjeto(objeto_id: number){
      return this.http.put(`${this.urlEndPoint}/inhabilitar/${objeto_id}`, null, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.error(e.error.error);
          swal.fire('Error al inhabilitar la herramienta.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }


    habilitarObjeto(objeto_id: number){
      return this.http.put(`${this.urlEndPoint}/habilitar/${objeto_id}`, null, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.error(e.error.error);
          swal.fire('Error al habilitar la herramienta.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }

}

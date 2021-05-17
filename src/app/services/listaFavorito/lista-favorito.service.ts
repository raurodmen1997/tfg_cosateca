import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { TokenService } from '../services.index';

@Injectable({
  providedIn: 'root'
})
export class ListaFavoritoService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/listasFavorito';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router, private tokenService:TokenService) { }


    getListaFavoritoById(lista_id:number){
      return this.http.get(`${this.urlEndPoint}/${lista_id}`, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{
  
          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
  
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener la lista de favorito.', e.error.mensaje, 'error');
          this.router.navigateByUrl("/inicio");
          return throwError(e);
        })
      )
    
    }




  getListaFavoritoByUser(usuario_id:any){
    return this.http.get(`${this.urlEndPoint}/usuario/${usuario_id}`, {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
      map(response => response as any),
      catchError(e =>{

        if (this.tokenService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.log(e);
        console.error(e.message);
        swal.fire('Error al obtener las listas favorito del usuario.', e.error.mensaje, 'error');
        this.router.navigateByUrl("/inicio");
        return throwError(e);
      })
    )
  
  }


  deleteLista(lista_id: any){
    //return this.http.delete(`${this.urlEndPoint}/${horarioId}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`).pipe(
    return this.http.delete(`${this.urlEndPoint}/${lista_id}`,  {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
      map(response => response as any),
      catchError(e =>{

        if (this.tokenService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire('Error al intentar eliminar una lista.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }

  deleteObjetoListaFavorito(lista_id: number, objeto_id:number){
    //return this.http.delete(`${this.urlEndPoint}/${horarioId}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`).pipe(
    return this.http.get(`${this.urlEndPoint}/eliminarObjeto?listaFavorito_id=${lista_id}&objeto_id=${objeto_id}`,  {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
      map(response => response as any),
      catchError(e =>{

        if (this.tokenService.isNoAutorizado(e)) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire('Error al intentar eliminar el objeto de la lista de favorito.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }


  guardarListaFavorito(listaFavorito: any, lista_id:number){

    let url:string = '';
    let result:Observable<any> = new Observable();

    if(lista_id !== null){
      url = `${this.urlEndPoint}/${lista_id}`
      result = this.http.put(url, listaFavorito,  {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }

          console.error(e.error.error);
          swal.fire('Error al editar una lista de favorito.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }else{
      url = `${this.urlEndPoint}`
      result = this.http.post(url, listaFavorito,  {headers:this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.error(e.error.message);
          swal.fire('Error al crear una lista de favorito.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }

    return result;

  }



}

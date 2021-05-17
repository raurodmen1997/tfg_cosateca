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
export class DonacionesUsuarioService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/peticionesDonaciones';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router, private tokenService:TokenService) { }





    getPeticionesDonacionByUser(page:any, usuario_id:any){
      return this.http.get(`${this.urlEndPoint}/page/${page}?usuario_id=${usuario_id}`, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
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


}

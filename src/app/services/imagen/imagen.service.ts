import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/imagenes';

  constructor(private http: HttpClient,
    private router:Router, private tokenService:TokenService, private authService:AuthService) { }


    uploadImagen(file:File){

      const formData: FormData = new FormData();

      formData.append('archivo', file);

      let httpHeaders = new HttpHeaders();
      let token = this.authService.token;
      if(token != null){
        httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
      }

      return this.http.post(`${this.urlEndPoint}`, formData, {headers: httpHeaders}).pipe(
        map(response => response as any),
        catchError(e =>{

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }
          
          console.error(e.error.message);
          swal.fire('Error al guardar la imagen.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );

    }



}

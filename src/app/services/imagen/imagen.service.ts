import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/imagenes';

  constructor(private http: HttpClient,
    private router:Router) { }


    uploadImagen(file:File){

      const formData: FormData = new FormData();

      formData.append('archivo', file);

      return this.http.post(`${this.urlEndPoint}`, formData).pipe(
        map(response => response as any),
        catchError(e =>{
          console.error(e.error.message);
          swal.fire('Error al guardar la imagen.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );

    }



}

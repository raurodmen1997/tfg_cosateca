import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AyuntamientoService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/ayuntamiento';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }


  obtenerInfoAyuntamiento(){
    return this.http.get(`${this.urlEndPoint}/obtenerInfo`, {headers:this.httpHeaders}).pipe(
      map(response => response as any),
      catchError(e =>{

        console.log(e);
        console.error(e.message);
        swal.fire('Error al obtener los horarios.', `${e.message}`, 'error');
        return throwError(e);
      })
    )
  
  }

}

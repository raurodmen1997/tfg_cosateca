import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ObjetoService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/objetos';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router) { }


    getObjetos(){
      return this.http.get(`${this.urlEndPoint}`).pipe(
        map(response => response as any),
        catchError(e =>{
          console.log(e);
          console.error(e.message);
          swal.fire('Error al obtener los objetos.', `${e.message}`, 'error');
          return throwError(e);
        })
      )
    
    }


}

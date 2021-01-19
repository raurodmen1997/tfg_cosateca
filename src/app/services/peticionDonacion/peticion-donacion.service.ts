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
export class PeticionDonacionService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/peticionesDonaciones';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  constructor(private http: HttpClient,
    private router:Router) { }



    guardarPeticionDonacion(peticionDonacion:any){
      return this.http.post(this.urlEndPoint, peticionDonacion, {headers: this.httpHeaders}).pipe(
        map(response => response as any),
        catchError(e =>{
          console.error(e.error.message);
          swal.fire('Error al crear una peticioón de donación.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }
}

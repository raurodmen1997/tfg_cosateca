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
export class UsuarioService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/usuarios';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router) { }




  guardarUsuario(usuario: any){
    return this.http.post(this.urlEndPoint, usuario, {headers: this.httpHeaders}).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.error);
        swal.fire('Error al guardar el usuario.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }
   
}

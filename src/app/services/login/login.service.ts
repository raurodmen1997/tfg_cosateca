import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlEndPoint: string = environment.domain_backend + '/api/login';

  constructor(private http: HttpClient) { }
  



  login(username:string, password:string):Observable<any> {
    let url:string = `${this.urlEndPoint}?nombre_perfil=${username}&pass=${password}`;
    return this.http.get(url).pipe(
      map(response => response as any),
      catchError(e =>{
        swal.fire('Error al iniciar sesión.', `${e.error.mensaje}.`, 'error');
        return throwError(e);
      })
    );
  }


  isLogged(){
    return !!localStorage.getItem('usuario')
  }



}

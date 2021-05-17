import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private authService:AuthService, private router:Router) { }


  agregarAutorizacionToken(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  isNoAutorizado(e:any): boolean {
    /*
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    */

    if (e.status == 403) {
      swal.fire('Acceso denegado.', 'Usted no tiene acceso a este recurso.', 'warning');
      this.router.navigate(['/inicio']);
      return true;
    }
    return false;
  }
}

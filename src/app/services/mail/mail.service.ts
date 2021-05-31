import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from '../services.index';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MailService {


  private urlEndPoint: string = environment.domain_backend + '/api/mail';


  constructor(private http: HttpClient,
    private router:Router, private tokenService:TokenService) { }



    enviarMail(to:string, subject:string, body:string){
      return this.http.post(`${this.urlEndPoint}/enviar?to=${to}&subject=${subject}&body=${body}`, null, {headers: this.tokenService.agregarAutorizacionToken()}).pipe(
        map(response => response as any),
        catchError(e =>{  

          if (this.tokenService.isNoAutorizado(e)) {
            return throwError(e);
          }

          console.error(e.error.error);
          swal.fire('Error al enviar el correo electrónico.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }


}

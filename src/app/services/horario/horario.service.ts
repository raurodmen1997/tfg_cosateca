import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  private urlEndPoint: string = environment.domain_backend + '/api/entidades/horarios';
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient,
    private router:Router) { }





  getHorarios(page:any){
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      map(response => response as any),
      catchError(e =>{
        console.log(e);
        console.error(e.message);
        swal.fire('Error al obtener los horarios.', `${e.message}`, 'error');
        return throwError(e);
      })
    )
  
  }


  getHorarioPorId(idHorario: number){
    return this.http.get(`${this.urlEndPoint}/${idHorario}`).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al obtener el horario.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    )
  }


  deleteHorario(horarioId: number){
    //return this.http.delete(`${this.urlEndPoint}/${horarioId}?username=${JSON.parse(localStorage.getItem('usuario')).userAccount.username}`).pipe(
    return this.http.delete(`${this.urlEndPoint}/${horarioId}`).pipe(
      map(response => response as any),
      catchError(e =>{
        console.error(e.error.mensaje);
        swal.fire('Error al intentar eliminar un horario.', `${e.error.mensaje}`, 'error');
        return throwError(e);
      })
    );
  }


  guardarHorario(horario: any, horario_id:number){

    let url:string = '';
    let result:Observable<any> = new Observable();

    if(horario_id !== null){
      url = `${this.urlEndPoint}/${horario_id}`
      result = this.http.put(url, horario).pipe(
        map(response => response as any),
        catchError(e =>{
          console.error(e.error.error);
          swal.fire('Error al editar un horario.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }else{
      url = `${this.urlEndPoint}`
      result = this.http.post(url, horario, {headers: this.httpHeaders}).pipe(
        map(response => response as any),
        catchError(e =>{
          console.error(e.error.message);
          swal.fire('Error al crear un horario.', `${e.error.mensaje}`, 'error');
          return throwError(e);
        })
      );
    }

    return result;

  }



}

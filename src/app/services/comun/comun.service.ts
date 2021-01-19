import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComunService {

  constructor(private router: Router) { }



 
  /**
   * Redirige a la pantalla que se especifica en el parámetro.
   * @param cadena Cadena de texto donde se va a redirigir.
   */
  ir_a(cadena:string, parametros:string){
    if(parametros === null){
      this.router.navigateByUrl(`${cadena}`);
    }else{
      this.router.navigate([`${cadena}`, parametros]);
    }  
  }

  
}

import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor(private authService:AuthService) { }


  contieneCodigoPostal(campo1: string){

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const codigo_postal = String(formGroup.get(campo1)?.value);
      const codigo_postal_ayuntamiento = String(this.authService.codigo);
      console.log(codigo_postal_ayuntamiento.split(",").includes(codigo_postal));

      if ( codigo_postal !== '' && codigo_postal.length === 5 && !codigo_postal_ayuntamiento.split(", ").includes(codigo_postal) ) {
        
        formGroup.get(campo1)?.setErrors({ noContieneCodigo: true });
        return { noContieneCodigo: true };
      } 

      return null;
    }
    
  }

  validarFechas(campo1: string, campo2: string){

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fecha_hora_apertura = new Date(2050, 0 , 0, Number(String(formGroup.get(campo1)?.value).split(":")[0]), Number(String(formGroup.get(campo1)?.value).split(":")[1]));
      const fecha_hora_cierre = new Date(2050, 0 , 0, Number(String(formGroup.get(campo2)?.value).split(":")[0]), Number(String(formGroup.get(campo2)?.value).split(":")[1]));

      console.log(formGroup.get(campo1)?.value !== '' && formGroup.get(campo2)?.value !== '' && fecha_hora_apertura >= fecha_hora_cierre);
      if ( fecha_hora_apertura >= fecha_hora_cierre) {
        
        formGroup.get(campo1)?.setErrors({ horaInvalida: true });
        return { horaInvalida: true };
      } 

      return null;
    }
    
  }



  camposIguales( campo1: string, campo2: string ) {

    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;

      if ( pass1 !== pass2 ) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true }
      } 



      formGroup.get(campo2)?.setErrors(null);

      return null
    }

  }

  
}

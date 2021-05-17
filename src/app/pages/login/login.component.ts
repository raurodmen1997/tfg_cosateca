import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import {
  AuthService,
  LoginService
} from '../../services/services.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder, private route:Router, private loginService:LoginService, private authService:AuthService) {

    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required)
    });
   
  }


  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.route.navigate(['/inicio']);
    }
  }


  signIn(){
    
    this.authService.login(this.form.get('usuario')?.value, this.form.get('contraseña')?.value).subscribe(
      result=>{
        this.authService.guardarUsuario(result.access_token);
        this.authService.guardarToken(result.access_token);
        this.route.navigate(['inicio']);
      },

      error =>{
        if (error.status == 400) {
          swal.fire('Error al iniciar sesión.', 'Usuario o contraseña incorrectas.', 'error');
        }
        this.form.reset()
      }   
    );
  }

}

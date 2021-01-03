import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
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

  constructor(private fb:FormBuilder, private route:Router, private loginService:LoginService) {

    this.form = this.fb.group({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required)
    });
   
  }


  ngOnInit() {
  }


  signIn(){
    
    this.loginService.login(this.form.get('usuario')?.value, this.form.get('contraseña')?.value).subscribe(
      user=>{
      //this.loginService.usuarioLogueado = user;
      //console.log(this.loginService.usuarioLogueado);
      localStorage.setItem('usuario', JSON.stringify(user));
      this.route.navigate(['inicio']);
      /*
      if(localStorage.getItem('carrito')){
        this.route.navigate(['carrito']);
      } else {
        this.route.navigate(['inicio']);
      }   
      */
    },

    error =>{
      this.form.reset()
    }
    
    );
    

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService, ValidacionesService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder, private route:Router, private usuarioService:UsuarioService, private validacionesService:ValidacionesService) {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      primer_apellido: new FormControl('', Validators.required),
      segundo_apellido: new FormControl('', Validators.required),
      codigo_postal: new FormControl('', [Validators.required, Validators.pattern("^\\d{5}$")]),
      tipo_identificacion: new FormControl('', Validators.required),
      codigo_identificacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      direccion_email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]),
      nombre_perfil: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      confirmPass: new FormControl('', Validators.required),
      check: new FormControl('', Validators.required)
    }, {

      validators: [this.validacionesService.camposIguales('pass', 'confirmPass'), this.validacionesService.contieneCodigoPostal('codigo_postal')]
    });
    
   }

  ngOnInit(){
  }



  onSubmit(){

    Swal.fire({
      title: '¿Está seguro de querer registrarse en el sistema?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){
        let usuario_nuevo:any = {};
        let cuenta: any = {};
        
        usuario_nuevo["codigo_postal"] = this.form.get('codigo_postal')?.value;
        usuario_nuevo["nombre"] = this.form.get('nombre')?.value;
        usuario_nuevo["primer_apellido"] = this.form.get('primer_apellido')?.value;
        usuario_nuevo["segundo_apellido"] = this.form.get('segundo_apellido')?.value;
        usuario_nuevo["tipo_identificacion"] = this.form.get('tipo_identificacion')?.value;
        usuario_nuevo["codigo_identificacion"] = this.form.get('codigo_identificacion')?.value;
        usuario_nuevo["telefono"] = this.form.get('telefono')?.value;
        usuario_nuevo["direccion_email"] = this.form.get('direccion_email')?.value;
        cuenta["nombre_perfil"] = this.form.get('nombre_perfil')?.value;
        cuenta["pass"] = btoa(this.form.get('pass')?.value);
        cuenta["autoridad"] = "ROLE_USER";
        usuario_nuevo["cuenta"] = cuenta;

        console.log(usuario_nuevo);
        
        
        this.usuarioService.guardarUsuario(usuario_nuevo).subscribe(resultado=>{
          console.log(resultado);
          Swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
          this.route.navigateByUrl('login');
        });
        
      }
    })

  }

}

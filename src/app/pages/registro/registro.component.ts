import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  form:FormGroup;

  usuario_nuevo:any = {
    codigo_postal: "",
    nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    telefono: "",
    direccion_email: "",
    cuenta: {
        nombre_perfil: "",
        pass: "",
        autoridad: "USUARIO_CLIENTE"
    },
    carro_compra: {},
    tipo_identificacion: "",
    codigo_identificacion: ""
}

  constructor(private fb:FormBuilder, private route:Router, private usuarioService:UsuarioService) {
    this.form = this.fb.group({
      nombre: new FormControl('', Validators.required),
      primer_apellido: new FormControl('', Validators.required),
      segundo_apellido: new FormControl('', Validators.required),
      codigo_postal: new FormControl('', Validators.required),
      tipo_identificacion: new FormControl('', Validators.required),
      codigo_identificacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      direccion_email: new FormControl('', Validators.required),
      nombre_perfil: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      confirmPass: new FormControl('', Validators.required)
    });
    
   }

  ngOnInit(){
  }



  onSubmit(){

    Swal.fire({
      title: '¿Está seguro de querer regustrarse en el sistema?',
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){
        this.usuario_nuevo.codigo_postal = this.form.get('codigo_postal')?.value;
        this.usuario_nuevo.nombre = this.form.get('nombre')?.value;
        this.usuario_nuevo.primer_apellido = this.form.get('primer_apellido')?.value;
        this.usuario_nuevo.segundo_apellido = this.form.get('segundo_apellido')?.value;
        this.usuario_nuevo.tipo_identificacion = this.form.get('tipo_identificacion')?.value;
        this.usuario_nuevo.codigo_identificacion = this.form.get('codigo_identificacion')?.value;
        this.usuario_nuevo.telefono = this.form.get('telefono')?.value;
        this.usuario_nuevo.direccion_email = this.form.get('direccion_email')?.value;
        this.usuario_nuevo.cuenta.nombre_perfil = this.form.get('nombre_perfil')?.value;
        this.usuario_nuevo.cuenta.pass = this.form.get('pass')?.value;
        
        this.usuarioService.guardarUsuario(this.usuario_nuevo).subscribe(resultado=>{
          console.log(resultado);
          Swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
          this.route.navigateByUrl('login');
        })
      }
    })

  }

}

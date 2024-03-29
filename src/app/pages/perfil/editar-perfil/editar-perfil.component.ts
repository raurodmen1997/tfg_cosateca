import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/dominio/usuario';
import {
  AuthService,
  AyuntamientoService,
  ComunService,
  CuentaService,
  UsuarioService,
  ValidacionesService,
} from 'src/app/services/services.index';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styles: [],
})
export class EditarPerfilComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public comunService: ComunService,
    private cuentaService: CuentaService,
    private usuarioService: UsuarioService,
    private ayuntamientoService:AyuntamientoService,
    private validacionesService:ValidacionesService
  ) {
    if(this.authService.hasRole("ROLE_USER")){

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
        /*
          pass: new FormControl('', Validators.required),
          confirmPass: new FormControl('', Validators.required)
          */
      }, {
        validators: [this.validacionesService.contieneCodigoPostal('codigo_postal')]
      });

    }else{
      this.form = this.fb.group({
        nombre: new FormControl('', Validators.required),
        telefono: new FormControl('', Validators.required),
        direccion_email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]),
        nombre_perfil: new FormControl('', Validators.required),
        direccion: new FormControl('', Validators.required),
      });
    }
    
  }

  ngOnInit(): void {
    this.inicializarFormulario(this.authService.usuario);
  }

  /**
   * Inicializa los campos del formulario con los valores del usuario pasado por parámetro.
   * @param usuario Usuario que ha iniciado sesión en el sistema.
   */
  inicializarFormulario(usuario: Usuario) {
    this.form.get('nombre')?.setValue(usuario.nombre);
    this.form.get('primer_apellido')?.setValue(usuario.primer_apellido);
    this.form.get('segundo_apellido')?.setValue(usuario.segundo_apellido);
    this.form.get('codigo_postal')?.setValue(usuario.codigo_postal);
    this.form.get('tipo_identificacion')?.setValue(usuario.tipo_identificacion);
    this.form
      .get('codigo_identificacion')
      ?.setValue(usuario.codigo_identificacion);
    this.form.get('telefono')?.setValue(usuario.telefono);
    this.form.get('direccion_email')?.setValue(usuario.direccion_email);
    this.form.get('nombre_perfil')?.setValue(usuario.username);
    this.form.get('direccion')?.setValue(usuario.direccion);
  }

  onSubmit() {
    Swal.fire({
      title: '¿Está seguro de querer actualizar su perfil?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning',
    }).then((result) => {

      if (result.isConfirmed) {

        /*
        this.authService.usuario.nombre = this.form.get('nombre')?.value;
        this.authService.usuario.telefono = this.form.get('telefono')?.value;
        this.authService.usuario.direccion = this.form.get('direccion')?.value;
        this.authService.usuario.direccion_email = this.form.get('direccion_email')?.value;
*/
        
        let usuario: any = {
          codigo_postal: this.form.get('codigo_postal')?.value,
          nombre: this.form.get('nombre')?.value,
          primer_apellido: this.form.get('primer_apellido')?.value,
          segundo_apellido: this.form.get('segundo_apellido')?.value,
          telefono: this.form.get('telefono')?.value,
          direccion_email: this.form.get('direccion_email')?.value,
          tipo_identificacion: this.form.get('tipo_identificacion')?.value,
          codigo_identificacion: this.form.get('codigo_identificacion')?.value,
          direccion: this.form.get('direccion')?.value
        };
        
        
        if(this.form.get('nombre_perfil')?.dirty){

          usuario['cuenta'] = null;
          if(this.authService.hasRole("ROLE_USER")){

            this.cuentaService.getCuentaById(this.authService.usuario.id_cuenta).subscribe((cuenta) => {
              cuenta.nombre_perfil = this.form.get('nombre_perfil')?.value;
              usuario.cuenta = cuenta;
              this.usuarioService.actualizarUsuario(this.authService.usuario.id, usuario).subscribe((resultado) => {
                this.authService.actualizarUsuario(resultado.usuario);
                swal.fire('Operación realizada correctamente.',resultado.mensaje,'success');
              });          
            });

          }else{

            usuario['municipio'] = this.authService.usuario.municipio;
            usuario['codigos_postales'] = this.authService.usuario.codigo_postal;
            usuario['provincia'] = this.authService.usuario.provincia;
            this.cuentaService.getCuentaById(this.authService.usuario.id_cuenta).subscribe((cuenta) => {
              cuenta.nombre_perfil = this.form.get('nombre_perfil')?.value;
              usuario.cuenta = cuenta;
              this.ayuntamientoService.actualizarAyuntamiento(this.authService.usuario.id, usuario).subscribe((resultado) => {
                this.authService.actualizarUsuario(resultado.ayuntamiento);
                swal.fire('Operación realizada correctamente.',resultado.mensaje,'success');
              });          
            });

          }
          
          
        }else{

          if(this.authService.hasRole("ROLE_USER")){

            this.usuarioService.actualizarUsuario(this.authService.usuario.id, usuario).subscribe((resultado) => {
              this.authService.actualizarUsuario(resultado.usuario);
              swal.fire('Operación realizada correctamente.',resultado.mensaje,'success');
            });

          }else{

            usuario['municipio'] = this.authService.usuario.municipio;
            usuario['codigos_postales'] = this.authService.usuario.codigo_postal;
            usuario['provincia'] = this.authService.usuario.provincia;
            this.ayuntamientoService.actualizarAyuntamiento(this.authService.usuario.id, usuario).subscribe(resultado=>{
              this.authService.actualizarUsuario(resultado.ayuntamiento);
              swal.fire('Operación realizada correctamente.',resultado.mensaje,'success');
            });

          }
         
          
        }
          
      }
    });
  }


  /**
   * Actualiza la contraseña del usuario autenticado.
   */
  cambiarPass(){

    swal.fire({
      title: 'Cambiar contraseña.',
      html:
    '<input id="swal-input1" placeholder="Contraseña" class="swal2-input">' +
    '<input id="swal-input2" placeholder="Repita contraseña" class="swal2-input">',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Guardar`,
      cancelButtonColor: '#d33',
      icon: 'warning',       
      preConfirm: () => {

        if((<HTMLInputElement>document.getElementById('swal-input1')).value === '' && (<HTMLInputElement>document.getElementById('swal-input2')).value === ''){
          Swal.showValidationMessage("Debe establecer un valor.")
        }
        if((<HTMLInputElement>document.getElementById('swal-input1')).value !== (<HTMLInputElement>document.getElementById('swal-input2')).value){
          Swal.showValidationMessage("Los valores de las contraseñas son distintas.")
        }

      }
      
    }).then((result) => {

      if(result.isConfirmed){

        let cuenta:any = {
          nombre_perfil: this.authService.usuario.username,
          pass:btoa((<HTMLInputElement>document.getElementById('swal-input1')).value)
        };

        this.cuentaService.actualizarCuenta(cuenta, this.authService.usuario.id_cuenta).subscribe(resultado=>{
          swal.fire('Operación realizada correctamente.',resultado.mensaje,'success');
        });
      }

    });

  }

  
}

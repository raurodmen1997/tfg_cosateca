import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/dominio/usuario';
import { AuthService, ComunService, MailService, ModalService, UsuarioService } from 'src/app/services/services.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario:Usuario = new Usuario();

  constructor(public authService:AuthService, 
              private modalService:ModalService, private comunService:ComunService, 
              private usuarioService:UsuarioService, private router:Router, private mailService:MailService) { }
  ngOnInit(): void {
    this.usuario = this.authService.usuario;
  }



  cerralModal(){
    this.modalService.abreModalPerfil = false;
  }


  irEditarPerfil(){
    this.modalService.abreModalPerfil = false;
    this.comunService.ir_a('editar-perfil', null!);
  }


  /**
   * Realiza la petición de olvido del usuario que está autenticado en el sistema.
   */
  realizarPeticionOlvido(){
    
    Swal.fire({
      title: `¿Está seguro de querer realizar la petición de olvido?`,
      text: 'Se procederá a enviar un correo a la dirección de correo del ayuntamiento para tramitar su petición.',
      showCancelButton: true,
      confirmButtonText: `Aceptar`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){

        this.usuarioService.realizarPeticiónOlvido(this.authService.usuario.id).subscribe(result=>{
          this.mailService.enviarMail("raulrodriguezmendez1997@gmail.com",`Petición de olvido del usuario '${this.authService.usuario.username}'.`, 
            `El usuario '${this.authService.usuario.nombre} ${this.authService.usuario.primer_apellido} ${this.authService.usuario.segundo_apellido}' desea ser eliminado del sistema.`).subscribe(resultado_mail=>{
            this.authService.actualizarUsuario(result.usuario);
            Swal.fire(result.mensaje, result.texto, 'success');
            this.cerralModal();
            this.router.navigate(['inicio']);

          });
         
        });
      }

    });

  }

}

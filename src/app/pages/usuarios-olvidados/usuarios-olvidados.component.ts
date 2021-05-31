import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ComunService, MailService, UsuarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-olvidados',
  templateUrl: './usuarios-olvidados.component.html',
  styles: [
  ]
})
export class UsuariosOlvidadosComponent implements OnInit {

  usuarios:any[] = [];
  paginador: any;
  url:any;
  
  constructor( private router:Router, public comunService:ComunService, private activatedRoute: ActivatedRoute, 
                private usuarioService:UsuarioService, private mailService:MailService) { }

  ngOnInit(): void {


    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) {
        page = 0;
      }

      this.usuarioService.getUsuariosOlvidados(page).subscribe(response=>{
        console.log(response);
        if(page >= response.totalPages){
          this.router.navigate(['/usuarios-olvidados']);
        }else{
          this.usuarios = response.content;
          this.paginador = response;
          this.url = '/usuarios-olvidados/page';
        }
        
      });

    });


  }


  /**
   * Elimina el usuario seleccionado del sistema porque ha solicitado la opción a ser olvidado.
   * @param usuario Usuario a ser eliminado del sistema.
   */
  eliminarUsuario(usuario:any){
    Swal.fire({
      title: `¿Está seguro de querer eliminar el usuario '${usuario.nombre}'?`,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){

        this.usuarioService.deleteUsuario(usuario.id).subscribe(result=>{
          this.mailService.enviarMail(usuario.direccion_email, `Petición de olvido del usuario '${usuario.cuenta.nombre_perfil}'.`, 
            `Su petición de olvido ha sido aceptada correctamente. Se ha procedido a eliminar todos sus datos del sistema.`).subscribe(result_mail=>{

            this.usuarios = this.usuarios.filter(usur => usur.id !== usuario.id);
            Swal.fire('Operación realizada correctamente.', result.mensaje, 'success');

          });
          
        });
      }

    });
  }



}

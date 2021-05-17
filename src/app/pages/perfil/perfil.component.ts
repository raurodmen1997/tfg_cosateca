import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/dominio/usuario';
import { AuthService, ComunService, ModalService } from 'src/app/services/services.index';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario:Usuario = new Usuario();

  constructor(private authService:AuthService, private modalService:ModalService, private comunService:ComunService) { }
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

}

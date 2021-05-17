import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginService,
  HorarioService,
  UsuarioService,
  ComunService,
  ImagenService,
  PeticionDonacionService,
  DonacionesAdminService,
  DonacionesUsuarioService,
  ObjetoService,
  ListaFavoritoService,
  ValoracionService,
  AuthService,
  TokenService,
  RoleGuard,
  ModalService,
  CuentaService
 } from './services.index';







@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LoginService,
    HorarioService,
    UsuarioService,
    ComunService,
    ImagenService,
    PeticionDonacionService,
    DonacionesAdminService,
    DonacionesUsuarioService,
    ObjetoService,
    ListaFavoritoService,
    ValoracionService,
    AuthService,
    TokenService,
    RoleGuard,
    ModalService,
    CuentaService
  ],
  declarations: []
})
export class ServiceModule { }

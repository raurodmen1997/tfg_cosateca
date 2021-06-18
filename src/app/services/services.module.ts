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
  CuentaService,
  MailService,
  AyuntamientoService,
  ValidacionesService
 } from './services.index';
import { ReservasUserService } from './reservas/reservas-user.service';
import { ReservasAdminService } from './reservas/reservas-admin.service';







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
    CuentaService,
    MailService,
    AyuntamientoService,
    ValidacionesService,
    ReservasUserService,
    ReservasAdminService
  ],
  declarations: []
})
export class ServiceModule { }

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
  DonacionesUsuarioService
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
    DonacionesUsuarioService
  ],
  declarations: []
})
export class ServiceModule { }

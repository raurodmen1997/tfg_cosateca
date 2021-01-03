import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LoginService,
  HorarioService
 } from './services.index';






@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LoginService,
    HorarioService
  ],
  declarations: []
})
export class ServiceModule { }

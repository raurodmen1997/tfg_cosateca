
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { HorariosComponent } from './horarios/horarios.component';
import { RegistroComponent } from './registro/registro.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { EditarCrearHorarioComponent } from './horarios/editar-crear-horario/editar-crear-horario.component';
import { CrearDonacionComponent } from './donaciones/crear-donacion/crear-donacion.component';
import { PaginatorComponent } from './componentes/paginator/paginator.component';
import { DonacionesAdminComponent } from './donaciones/donaciones-admin/donaciones-admin.component';
import { DonacionesUsuarioComponent } from './donaciones/donaciones-usuario/donaciones-usuario.component';
import { HerramientaComponent } from './componentes/herramienta/herramienta.component';
import { ObjetosComponent } from './objetos/objetos.component';


@NgModule({
    declarations: [
        HorariosComponent,
        LoginComponent,
        RegistroComponent,
        PagesComponent,
        EditarCrearHorarioComponent,
        CrearDonacionComponent,
        PaginatorComponent,
        DonacionesAdminComponent,
        DonacionesUsuarioComponent,
        HerramientaComponent,
        ObjetosComponent
    ],
    exports: [
        CommonModule
    ],
    imports: [
        PAGES_ROUTES,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule
    ]
})
export class PagesModule { }

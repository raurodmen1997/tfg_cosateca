
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


@NgModule({
    declarations: [
        HorariosComponent,
        LoginComponent,
        RegistroComponent,
        PagesComponent,
        EditarCrearHorarioComponent
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

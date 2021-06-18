
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
import { ListaFavotiroComponent } from './lista-favotiro/lista-favotiro.component';
import { DetalleComponent } from './objetos/detalle/detalle.component';
import {RatingModule} from 'ng-starrating';
import { PerfilComponent } from './perfil/perfil.component';
import { EditarPerfilComponent } from './perfil/editar-perfil/editar-perfil.component';
import { ValoracionesComponent } from './valoraciones/valoraciones.component';
import { ValoracionComponent } from './componentes/valoracion/valoracion.component';
import { EditarValoracionComponent } from './valoraciones/editar-valoracion/editar-valoracion.component';
import { ObjetosListaFavoritoComponent } from './lista-favotiro/objetos-lista-favorito/objetos-lista-favorito.component';
import { ReservasUsuarioComponent } from './reservas/reservas-usuario/reservas-usuario.component';
import { ReservasAdminComponent } from './reservas/reservas-admin/reservas-admin.component';
import { UsuariosOlvidadosComponent } from './usuarios-olvidados/usuarios-olvidados.component';
import { InicioComponent } from './inicio/inicio.component';
import { CrearPeticionReservaComponent } from './reservas/reservas-usuario/crear-peticion-reserva/crear-peticion-reserva.component';
import { CrearValoracionComponent } from './valoraciones/crear-valoracion/crear-valoracion.component';
import { TycComponent } from './tyc/tyc.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';






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
        ObjetosComponent,
        ListaFavotiroComponent,
        DetalleComponent,
        PerfilComponent,
        EditarPerfilComponent,
        ValoracionesComponent,
        ValoracionComponent,
        EditarValoracionComponent,
        ObjetosListaFavoritoComponent,
        ReservasUsuarioComponent,
        ReservasAdminComponent,
        UsuariosOlvidadosComponent,
        InicioComponent,
        CrearPeticionReservaComponent,
        CrearValoracionComponent,
        TycComponent,
        PoliticaPrivacidadComponent
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
        BrowserModule,
        RatingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        NgbModalModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    ]
})
export class PagesModule { }

import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { HorariosComponent } from './horarios/horarios.component';
import { EditarCrearHorarioComponent } from './horarios/editar-crear-horario/editar-crear-horario.component';








const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
            { path: 'inicio', component: InicioComponent, data:{titulo:'Inicio'} },
            { path:'login', component:LoginComponent, data:{titulo:'Inicio de sesión'}},
            { path:'registro', component:RegistroComponent, data:{titulo:'Registro'}},
            { path:'horarios', component:HorariosComponent, data:{titulo:'Horarios'}},
            { path:'horarios/nuevo-horario', component:EditarCrearHorarioComponent, data:{titulo:'Nuevo horario'}},
            { path:'horarios/editar-horario/:horario_id', component:EditarCrearHorarioComponent, data:{titulo:'Editar horario'}}

           
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

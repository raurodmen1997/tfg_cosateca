import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InicioComponent } from './inicio/inicio.component';
import { HorariosComponent } from './horarios/horarios.component';
import { EditarCrearHorarioComponent } from './horarios/editar-crear-horario/editar-crear-horario.component';
import { CrearDonacionComponent } from './donaciones/crear-donacion/crear-donacion.component';
import { DonacionesAdminComponent } from './donaciones/donaciones-admin/donaciones-admin.component';
import { DonacionesUsuarioComponent } from './donaciones/donaciones-usuario/donaciones-usuario.component';
import { ObjetosComponent } from './objetos/objetos.component';








const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
            { path:'inicio', component: InicioComponent, data:{titulo:'Inicio'} },
            { path:'login', component:LoginComponent, data:{titulo:'Inicio de sesión'}},
            { path:'registro', component:RegistroComponent, data:{titulo:'Registro'}},
            { path:'horarios', component:HorariosComponent, data:{titulo:'Horarios'}},
            { path:'horarios/page/:page', component: HorariosComponent, data:{titulo:'Horarios'}},
            { path:'nuevo-horario', component:EditarCrearHorarioComponent, data:{titulo:'Nuevo horario'}},
            { path:'editar-horario/:horario_id', component:EditarCrearHorarioComponent, data:{titulo:'Editar horario'}},
            { path:'nueva-donacion', component:CrearDonacionComponent, data:{titulo:'Nueva donación'}},
            { path:'donaciones-admin', component:DonacionesAdminComponent, data:{titulo:'Donaciones'}},
            { path:'donaciones-usuario', component:DonacionesUsuarioComponent, data:{titulo:'Mis donaciones'}},
            { path:'objetos', component:ObjetosComponent, data:{titulo:'Objetos'}}
            

           
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

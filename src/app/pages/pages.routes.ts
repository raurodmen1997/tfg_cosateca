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
import { ListaFavotiroComponent } from './lista-favotiro/lista-favotiro.component';
import { DetalleComponent } from './objetos/detalle/detalle.component';
import { RoleGuard } from '../services/services.index';
import { PerfilComponent } from './perfil/perfil.component';
import { EditarPerfilComponent } from './perfil/editar-perfil/editar-perfil.component';
import { ValoracionesComponent } from './valoraciones/valoraciones.component';
import { EditarValoracionComponent } from './valoraciones/editar-valoracion/editar-valoracion.component';
import { ObjetosListaFavoritoComponent } from './lista-favotiro/objetos-lista-favorito/objetos-lista-favorito.component';
import { ReservasUsuarioComponent } from './reservas/reservas-usuario/reservas-usuario.component';
import { ReservasAdminComponent } from './reservas/reservas-admin/reservas-admin.component';
import { UsuariosOlvidadosComponent } from './usuarios-olvidados/usuarios-olvidados.component';
import { CrearPeticionReservaComponent } from './reservas/reservas-usuario/crear-peticion-reserva/crear-peticion-reserva.component';
import { CrearValoracionComponent } from './valoraciones/crear-valoracion/crear-valoracion.component';
import { TycComponent } from './tyc/tyc.component';
import { PoliticaPrivacidadComponent } from './politica-privacidad/politica-privacidad.component';








const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: '/inicio', pathMatch: 'full' },
            { path:'inicio', component: InicioComponent, data:{titulo:'Inicio'} },
            { path:'login', component:LoginComponent, data:{titulo:'Inicio de sesión'}},
            { path:'registro', component:RegistroComponent, data:{titulo:'Registro'}},

            { path:'horarios', component:HorariosComponent, canActivate: [RoleGuard], data:{titulo:'Horarios', role: 'ROLE_ADMIN'}},
            { path:'horarios/page/:page', component: HorariosComponent, canActivate: [RoleGuard], data:{titulo:'Horarios', role: 'ROLE_ADMIN'}},
            { path:'nuevo-horario', component:EditarCrearHorarioComponent, canActivate: [RoleGuard], data:{titulo:'Nuevo horario', role: 'ROLE_ADMIN'}},
            { path:'editar-horario/:horario_id', component:EditarCrearHorarioComponent, canActivate: [RoleGuard], data:{titulo:'Editar horario', role: 'ROLE_ADMIN'}},
            
            { path:'donaciones-usuario', component:DonacionesUsuarioComponent, canActivate: [RoleGuard], data:{titulo:'Mis donaciones', role: 'ROLE_USER'}},
            { path:'donaciones-usuario/page/:page', component: DonacionesUsuarioComponent, canActivate: [RoleGuard], data:{titulo:'Mis donaciones', role: 'ROLE_USER'}},
            { path:'nueva-donacion', component:CrearDonacionComponent, canActivate: [RoleGuard], data:{titulo:'Nueva donación', role: 'ROLE_USER'}},
            
            { path:'donaciones-admin', component:DonacionesAdminComponent, canActivate: [RoleGuard], data:{titulo:'Donaciones', role: 'ROLE_ADMIN'}},
            { path:'donaciones-admin/page/:page', component: DonacionesAdminComponent, canActivate: [RoleGuard], data:{titulo:'Donaciones', role: 'ROLE_ADMIN'}},
            
            { path:'listas-favorito', component:ListaFavotiroComponent, canActivate: [RoleGuard], data:{titulo:'Listas favorito', role: 'ROLE_USER'}},
            { path:'objetos-lista-favorito/:lista_id', component:ObjetosListaFavoritoComponent, canActivate: [RoleGuard], data:{titulo:'Objetos en lista favorito', role: 'ROLE_USER'}},

            { path:'objetos', component:ObjetosComponent, data:{titulo:'Objetos'}}, 
            { path:'detalle-objeto/:objeto_id', component:DetalleComponent, data:{titulo:'Detalle objeto'}},

            { path:'perfil', component:PerfilComponent, data:{titulo:'Perfil'}},
            { path:'editar-perfil', component:EditarPerfilComponent, data:{titulo:'Editar perfil'}},

            { path:'valoraciones', component:ValoracionesComponent, canActivate: [RoleGuard], data:{titulo:'Mis valoraciones',  role: 'ROLE_USER'}},
            { path:'editar-valoracion/:valoracion_id', component:EditarValoracionComponent, canActivate: [RoleGuard], data:{titulo:'Editar valoración',  role: 'ROLE_USER'}},
            { path:'crear-valoracion/:objeto_id', component:CrearValoracionComponent, canActivate: [RoleGuard], data:{titulo:'Crear valoración',  role: 'ROLE_USER'}},
           
            { path:'reservas-usuario', component:ReservasUsuarioComponent, canActivate: [RoleGuard], data:{titulo:'Mis peticiones de reserva',  role: 'ROLE_USER'}},
            { path:'reservas-usuario/page/:page', component:ReservasUsuarioComponent, canActivate: [RoleGuard], data:{titulo:'Mis peticiones de reserva',  role: 'ROLE_USER'}},
            { path:'crear-peticion-reserva/:objeto_id', component:CrearPeticionReservaComponent, canActivate: [RoleGuard], data:{titulo:'Crear petición reserva',  role: 'ROLE_USER'}},

            { path:'reservas-admin', component:ReservasAdminComponent, canActivate: [RoleGuard], data:{titulo:'Reservas',  role: 'ROLE_ADMIN'}},
            { path:'reservas-admin/page/:page', component:ReservasAdminComponent, canActivate: [RoleGuard], data:{titulo:'Reservas',  role: 'ROLE_ADMIN'}},

            { path:'usuarios-olvidados', component:UsuariosOlvidadosComponent, canActivate: [RoleGuard], data:{titulo:'Usuarios olvidados',  role: 'ROLE_ADMIN'}},
            { path:'usuarios-olvidados/page/:page', component: UsuariosOlvidadosComponent, canActivate: [RoleGuard], data:{titulo:'Usuarios olvidados', role: 'ROLE_ADMIN'}},

           
            { path:'terminos-y-condiciones', component:TycComponent, data:{titulo:'Usuarios olvidados'}},
            { path:'politica-privacidad', component:PoliticaPrivacidadComponent, data:{titulo:'Usuarios olvidados'}},

        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

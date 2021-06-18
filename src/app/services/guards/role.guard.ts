import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services.index';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

   constructor(private authService: AuthService,
    private router: Router) { }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route);
      
      if(route.data.titulo !== "Reservas"){
        sessionStorage.removeItem('peticiones_reserva_usuario');
        sessionStorage.removeItem('codigo_identificacion_busqueda');
      }
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }

      if(this.isTokenExpirado()){
        swal.fire('Acceso denegado.', 'Su sesión ha expirado.', 'warning');
        this.authService.logout();
        this.router.navigate(['/inicio']);
        return false;
      }


  
      let role = route.data['role'] as string;
      console.log(role);
      if (this.authService.hasRole(role)) {
        return true;
      }
      swal.fire('Acceso denegado.', 'Usted no tiene acceso a este recurso.', 'warning');
      this.router.navigate(['/inicio']);
      return false;
  }


  isTokenExpirado(): boolean{
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if(payload.exp < now){
      return true;
    }
    return false;
  }
  
}

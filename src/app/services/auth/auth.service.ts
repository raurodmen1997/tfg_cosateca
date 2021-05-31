import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/dominio/usuario';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _usuario: any;
  private _token: any;

  constructor(private http: HttpClient) { }


  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): any {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  login(username:string, password:string): Observable<any> {
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }


  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.primer_apellido = payload?.primer_apellido;
    this._usuario.segundo_apellido = payload?.segundo_apellido;
    this._usuario.username = payload.user_name;
    this._usuario.telefono = payload?.telefono;
    this._usuario.direccion_email = payload?.direccion_email;
    this._usuario.direccion = payload?.direccion;
    this._usuario.id = payload.id;
    this._usuario.roles = payload.authorities[0];
    this._usuario.codigo_postal = payload.codigo_postal;
    this._usuario.codigo_identificacion = payload.codigo_identificacion;
    this._usuario.tipo_identificacion = payload.tipo_identificacion;
    this._usuario.olvidado = payload?.olvidado;
    this._usuario.id_cuenta = payload.id_cuenta;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  actualizarUsuario(usuario:any){
    this._usuario = new Usuario();
    this._usuario.nombre = usuario.nombre;
    this._usuario.primer_apellido = usuario?.primer_apellido;
    this._usuario.segundo_apellido = usuario?.segundo_apellido;
    this._usuario.username = usuario.cuenta.nombre_perfil;
    this._usuario.telefono = usuario?.telefono;
    this._usuario.direccion_email = usuario?.direccion_email;
    this._usuario.direccion = usuario?.direcion;
    this._usuario.id = usuario.id;
    this._usuario.roles = usuario.cuenta.autoridad;
    this._usuario.codigo_postal = usuario.codigo_postal;
    this._usuario.codigo_identificacion = usuario.codigo_identificacion;
    this._usuario.tipo_identificacion = usuario.tipo_identificacion;
    this._usuario.olvidado = usuario?.olvidado;
    this._usuario.id_cuenta = usuario.cuenta.id;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }


  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  hasRole(role: string): boolean {
    if (this.usuario.roles === role) {
      return true;
    }
    return false;
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, ComunService, PeticionDonacionService } from '../../../services/services.index';
import Swal from 'sweetalert2';
import { ImagenService } from '../../../services/services.index';

@Component({
  selector: 'app-crear-donacion',
  templateUrl: './crear-donacion.component.html',
  styles: [
  ]
})
export class CrearDonacionComponent implements OnInit {

  form:FormGroup;

  file:any = {};

  peticionDonacion:any = {
    categoria: "",
    descripcion: "",
    nombre: "",
    imagen: {},
    usuario: this.authService.usuario
  }

  /**
   *  "ayuntamiento": {
        "id": 1,
        "municipio": "La rinconada",
        "nombre": "Ayuntamiento de la Rinconada",
        "provincia": "Sevilla",
        "codigos_postales": [
            41300,
            41309
        ],
        "cuenta": {
            "id": 1,
            "nombre_perfil": "admin",
            "pass": "21232f297a57a5a743894a0e4a801fc3",
            "autoridad": "ROLE_ADMIN"
        },
        "direccion_email": " info@aytolarinconada.es"
    },

     "usuario": {
        "id": 1,
        "codigo_postal": 41300,
        "nombre": "Raul",
        "primer_apellido": "Rodriguez",
        "segundo_apellido": "Mendez",
        "telefono": "674761837",
        "direccion_email": "raulrodriguezmendez97@gmail.com",
        "cuenta": {
            "id": 2,
            "nombre_perfil": "raul",
            "pass": "8979054b38dbd9ed52373e3fd83ce164",
            "autoridad": "ROLE_USER"
        },
        "carro_compra": {},
        "tipo_identificacion": "NIF",
        "codigo_identificacion": "53346768Q"
    }
   */

  constructor(private fb: FormBuilder, private router: Router, 
              public comunService:ComunService, 
              private imagenService:ImagenService,
              private peticionDonacionService:PeticionDonacionService,
              private authService: AuthService) {

    this.form = this.fb.group({
      categoria: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
    });
    
   }


   

  ngOnInit(){
  }



  /**
   * Establece el valor del fichero al cambiar el valor en el imput.
   * @param event Evento que se produce al cambiar el archivo en el imput.
   */
  establecerFile(event:any){
    this.file = event.target.files[0];
  }


  /**
   * Realiza la operación de guardar una peticion de donación. Previamente realiza el guardado de la imagen.
   */
  guardarDonacion(){

    Swal.fire({
      title: '¿Está seguro de querer realizar la petición de donación?',
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){
        
       this.imagenService.uploadImagen(this.file).subscribe(resultado =>{

        this.peticionDonacion.categoria = this.form.get('categoria')?.value;
        this.peticionDonacion.nombre = this.form.get('nombre')?.value;
        this.peticionDonacion.descripcion = this.form.get('descripcion')?.value;
        this.peticionDonacion.imagen = resultado;

        this.peticionDonacionService.guardarPeticionDonacion(this.peticionDonacion).subscribe(resultado_peticion_donacion =>{
          Swal.fire('Operación realizada correctamente.', resultado_peticion_donacion.mensaje, 'success');
          this.router.navigate(['/donaciones-usuario']);
        })

       })
      }

    })


  }

}

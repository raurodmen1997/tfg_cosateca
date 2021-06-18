import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValoracionService, ComunService, ObjetoService, AuthService } from 'src/app/services/services.index';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-valoracion',
  templateUrl: './crear-valoracion.component.html',
  styles: [
  ]
})
export class CrearValoracionComponent implements OnInit {

  form:FormGroup;
  objeto:any;
  
  constructor(private valoracionService:ValoracionService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private router: Router,
    public comunService:ComunService, private objetoService:ObjetoService, private authService:AuthService) { 
      this.form = this.fb.group({
        comentario: new FormControl('', Validators.required),
        puntuacion: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
        usuario: new FormControl(this.authService.usuario),
        objeto: new FormControl(''),
      });
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param =>{

      if(param.has('objeto_id')){
        this.objetoService.getObjetoPorId(parseInt(param.get("objeto_id")!, 10)).subscribe(objeto=>{
          this.objeto = objeto;
          this.form.get('objeto')?.setValue(this.objeto);
          console.log(objeto);
        });
      }
    });
  }

  onSubmit(){
    
    Swal.fire({
      title: '¿Está seguro de querer crear la valoración?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning',
    }).then((result) => {

      if(result.isConfirmed){

        console.log(this.form.value);

        this.valoracionService.crearValoracion(this.form.value).subscribe(resultado=>{
          swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
          this.comunService.ir_a("detalle-objeto", this.objeto.id);
        })
      }

    });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunService, ValoracionService } from 'src/app/services/services.index';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-valoracion',
  templateUrl: './editar-valoracion.component.html',
  styles: [
  ]
})
export class EditarValoracionComponent implements OnInit {

  form:FormGroup;
  valoracion:any;

  constructor(private valoracionService:ValoracionService, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    private router: Router,
    public comunService:ComunService) { 
    this.form = this.fb.group({
      comentario: new FormControl('', Validators.required),
      puntuacion: new FormControl('', [Validators.required, Validators.min(0), Validators.max(5)]),
    });
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(param =>{

      if(param.has('valoracion_id')){
        this.valoracionService.getValoracionPorId(parseInt(param.get("valoracion_id")!, 10)).subscribe(valoracion=>{
          this.valoracion = valoracion;
          console.log(valoracion);
          this.iniciarFormulario(valoracion);
        });
      }

    });

  }


  iniciarFormulario(valoracion:any){
    this.form.get('comentario')?.setValue(valoracion.comentario);
    this.form.get('puntuacion')?.setValue(valoracion.puntuacion);
  }

  onSubmit(){

    Swal.fire({
      title: '¿Está seguro de querer actualizar la valoración?',
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning',
    }).then((result) => {

      if(result.isConfirmed){

        console.log(this.form.value);

        this.valoracionService.actualizarValoracion(this.valoracion.id, this.form.value).subscribe(resultado=>{
          swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
          this.router.navigateByUrl('valoraciones');
        })
      }

    });
  }

}

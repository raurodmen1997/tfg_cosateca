import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComunService, HorarioService, ValidacionesService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-crear-horario',
  templateUrl: './editar-crear-horario.component.html',
  styles: [
  ]
})
export class EditarCrearHorarioComponent implements OnInit, DoCheck {

  form:FormGroup;
  horario_id:any = null; 
  horario_nuevo:any = {
    dia: '',
    hora_apertura: '',
    hora_cierre: '',
    ayuntamiento: JSON.parse(localStorage.getItem('usuario')!)
  }
  
  constructor(private fb: FormBuilder,
    private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public comunService:ComunService,
    private validacionesService:ValidacionesService) { 

      this.form = this.fb.group({
        dia: new FormControl('', Validators.required),
        hora_apertura: new FormControl('', Validators.required),
        hora_cierre: new FormControl('', Validators.required)
      },{
        validators:[ this.validacionesService.validarFechas('hora_apertura', 'hora_cierre')]
      });
      
    }

  ngDoCheck(){

  }

  ngOnInit(){

    this.activatedRoute.paramMap.subscribe(param =>{

      if(param.has('horario_id')){
        this.horario_id = parseInt(param.get("horario_id")!, 10);
        this.horarioService.getHorarioPorId(parseInt(param.get("horario_id")!, 10)).subscribe(horario=>{
          console.log(horario);
          this.inicializarFormulario(horario);
        })
      }

    })
  }


  /**
   * Inicializa los campos del formulario con los valores del horario pasado por parámetro.
   * @param horario Horario seleccionado
   */
  inicializarFormulario(horario:any){
    this.form.get('dia')?.setValue(horario.dia);
    this.form.get('hora_apertura')?.setValue(horario.hora_apertura);
    this.form.get('hora_cierre')?.setValue(horario.hora_cierre);
  }


/**
 * Realiza la operación de añadir un nuevo horario o actualizar un horario.
 */
  guardarHorario(){
    let title = "";
    if(this.horario_id){
      title = "¿Está seguro de querer actualizar el horario?"
    }else{
      title = "¿Está seguro de querer añadir el nuevo horario?"
    }

    Swal.fire({
      title: `${title}`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){
        this.horario_nuevo.dia = this.form.get('dia')?.value;
        this.horario_nuevo.hora_apertura = new Date(2050, 0 , 0, Number(String(this.form.get('hora_apertura')?.value).split(":")[0]), Number(String(this.form.get('hora_apertura')?.value).split(":")[1]));
        this.horario_nuevo.hora_cierre = new Date(2050, 0 , 0, Number(String(this.form.get('hora_cierre')?.value).split(":")[0]), Number(String(this.form.get('hora_cierre')?.value).split(":")[1]));
        console.log(this.horario_nuevo);
        this.horarioService.guardarHorario(this.horario_nuevo, this.horario_id).subscribe(resultado =>{
          Swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
          this.router.navigateByUrl('horarios');
        })
      }

    })

  }

}

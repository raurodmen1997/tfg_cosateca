import { Component, OnInit } from '@angular/core';
import { HorarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styles: [
  ]
})
export class HorariosComponent implements OnInit {

  public horarios:any[] = [];

  constructor(private horarioService:HorarioService) { }

  ngOnInit(){


    this.horarioService.getHorarios().subscribe(horarios=>{
      this.horarios = horarios;
      console.log(horarios);
    })
  }



  /**
   * Elimina el horario cuyo identificador es el pasado por parámetro
   * @param horario_id Identificador del horario a eliminar
   */
  eliminarHorario(horario_id:number){

    Swal.fire({
      title: '¿Está seguro de querer eliminar el horario?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){

        this.horarioService.deleteHorario(horario_id).subscribe(result=>{
          this.horarios = this.horarios.filter(hor => hor.id !== horario_id);
          Swal.fire('Operación realizada correctamente.', result.mensaje, 'success');
        })
      }

    })

  }
}

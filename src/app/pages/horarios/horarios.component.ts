import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ComunService, HorarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styles: [
  ]
})
export class HorariosComponent implements OnInit {

  public horarios:any[] = [];

  constructor(private horarioService:HorarioService, public comunService:ComunService, private activatedRoute: ActivatedRoute) { }

  paginador: any;

  ngOnInit(){

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) {
        page = 0;
      }

      this.horarioService.getHorarios(page).subscribe(response=>{
        this.horarios = response.content;
        this.paginador = response;
      });

    });


    
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

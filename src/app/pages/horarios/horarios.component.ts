import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  

  constructor(private horarioService:HorarioService, private router:Router, public comunService:ComunService, private activatedRoute: ActivatedRoute) { }

  paginador: any;
  url:any;

  ngOnInit(){

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page')!;

      if (!page) {
        page = 0;
      }

      this.horarioService.getHorarios(page).subscribe(response=>{
        console.log(response);
        if(page >= response.totalPages){
          this.router.navigate(['/horarios']);
        }else{
          this.horarios = response.content;
          this.paginador = response;
          this.url = '/horarios/page';
        }
        
      });

    });


    
  }



  /**
   * Elimina el horario cuyo identificador es el pasado por parámetro
   * @param horario_id Identificador del horario a eliminar
   */
  eliminarHorario(horario:any){

    Swal.fire({
      title: `¿Está seguro de querer eliminar el horario '${horario.dia} de  ${horario.hora_apertura} a ${horario.hora_cierre}'?`,
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonColor: '#d33',
      icon: 'warning'
    }).then((result) => {

      if(result.isConfirmed){

        this.horarioService.deleteHorario(horario.id).subscribe(result=>{
          this.horarios = this.horarios.filter(hor => hor.id !== horario.id);
          Swal.fire('Operación realizada correctamente.', result.mensaje, 'success');
        })
      }

    })

  }
}

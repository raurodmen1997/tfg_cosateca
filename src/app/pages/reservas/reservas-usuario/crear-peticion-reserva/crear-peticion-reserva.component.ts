import { Component, OnInit } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasUserService } from 'src/app/services/reservas/reservas-user.service';
import { ObjetoService, ComunService, AuthService, ValidacionesService } from 'src/app/services/services.index';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-crear-peticion-reserva',
  templateUrl: './crear-peticion-reserva.component.html',
  styles: [
  ]
})
export class CrearPeticionReservaComponent implements OnInit {

  public peticionesReservaObjeto:any[] = [];
  form:FormGroup;
  objeto:any;
  pagina:string = 'crear-peticion-reserva';

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  //activeDayIsOpen: boolean = true;

  events: any[] = [];


  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private objetoService:ObjetoService,
    public comunService:ComunService,
    public authService:AuthService,
    private fb: FormBuilder,
    private peticionReservaService:ReservasUserService,
    private validacionesService:ValidacionesService) {
      registerLocaleData(localeEs);
      this.form = this.fb.group({
        fecha_fin_reserva: new FormControl('', Validators.required),
        fecha_inicio_reserva: new FormControl('', Validators.required),
        usuario: new FormControl(this.authService.usuario),
        objeto: new FormControl(''),
      });

     }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(param =>{

      if(param.has('objeto_id')){
        this.objetoService.getObjetoPorId(parseInt(param.get("objeto_id")!, 10)).subscribe(objeto=>{
          console.log(objeto);
          this.objeto = objeto;
          this.form.get('objeto')?.setValue(this.objeto);

          this.peticionReservaService.getPeticionesReservaObjeto(parseInt(param.get("objeto_id")!, 10)).subscribe(response =>{
            if(response.peticionesObjeto.length !== 0){
              this.peticionesReservaObjeto = response.peticionesObjeto;
              this.peticionesReservaObjeto.forEach(x => this.events.push({start: new Date(x.fecha_inicio_reserva), end: new Date(x.fecha_fin_reserva),color: colors.red}));
            }        
            console.log(response);
          });

          /*
          this.valoracionService.getValoracionesObjeto(this.objeto_id).subscribe(valoraciones=>{
            this.valoracionesObjeto = valoraciones;
            console.log(valoraciones);

            this.valoracionService.getValoracionMediaObjeto(this.objeto_id).subscribe(valoracionMedia=>{
              console.log(valoracionMedia);
            })
          }); 
*/
        });
      }

    });

  }





  realizarReserva(){
    Swal.fire({
      title: '¿Está seguro de querer crear la petición de reserva?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: `Si`,
      cancelButtonColor: '#d33',
      icon: 'warning',
    }).then((result) => {
      if(result.isConfirmed){
        this.peticionReservaService.guardarPeticionReserva(this.form.value).subscribe(
          resultado=>{
            swal.fire('Operación realizada correctamente.', resultado.mensaje, 'success');
            this.comunService.ir_a("reservas-usuario", null!);
          },
          error=>{
            swal.fire('Error al realizar la reserva.', error.error.error, 'error');
          },
          () => {
          }  
        )
      }
    });
  }



}

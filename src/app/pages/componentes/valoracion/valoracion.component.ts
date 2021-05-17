import { Component, Input, OnInit } from '@angular/core';
import { ValoracionService } from 'src/app/services/services.index';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.scss']
})
export class ValoracionComponent implements OnInit {

  @Input() valoracion: any;

  constructor(private valoracionService:ValoracionService) { }

  ngOnInit(): void {
  }


    



}

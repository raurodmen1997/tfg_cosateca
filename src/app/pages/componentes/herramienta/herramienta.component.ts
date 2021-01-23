import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-herramienta',
  templateUrl: './herramienta.component.html',
  styles: [
  ]
})
export class HerramientaComponent implements OnInit {


  @Input() objeto: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}

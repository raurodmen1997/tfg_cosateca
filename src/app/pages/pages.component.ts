import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/services.index';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(public modalService:ModalService) { }

  ngOnInit() {
  }

}

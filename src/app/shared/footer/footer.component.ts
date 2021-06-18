import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent implements OnInit {

  @Input() info: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.info);
  }

}

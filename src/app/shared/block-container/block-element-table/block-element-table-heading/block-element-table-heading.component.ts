import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-element-table-heading',
  template: '<ng-content></ng-content>',
  styleUrls: ['./block-element-table-heading.component.scss']
})
export class BlockElementTableHeadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

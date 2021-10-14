import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-element-table-row',
  template: '<ng-content></ng-content>',
  styleUrls: ['./block-element-table-row.component.scss']
})
export class BlockElementTableRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-element-table-cell',
  template: '<ng-content></ng-content>',
  styleUrls: ['./block-element-table-cell.component.scss']
})
export class BlockElementTableCellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

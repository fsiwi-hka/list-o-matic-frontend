import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '../../../../../../../../../../data/work/HsKA/listomatic/frontend/node_modules/@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @Input() titleIcon: IconProp | null = null;

  @Input() title: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

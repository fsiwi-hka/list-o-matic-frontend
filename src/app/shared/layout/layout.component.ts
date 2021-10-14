import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  /**
   * Icon to show in the header of the page
   */
  @Input() titleIcon: IconProp | null = null;

  /**
   * Title of this page
   */
  @Input() title: string = '';

  /**
   * List of breadcrumbs to show (Name, link)
   */
  @Input() breadcrumbs: Map<string, string> = new Map<string, string>();

  constructor() { }

  ngOnInit(): void {
  }

}

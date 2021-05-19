import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-block-element',
  templateUrl: './block-element.component.html',
  styleUrls: ['./block-element.component.scss']
})
export class BlockElementComponent implements OnInit {

  @Input() name = '';
  @Input() icon = faPlus;

  @Input() set isButton(newValue: boolean) {
    this.elementIsButton = newValue;
  }
  @HostBinding('class.is-button') elementIsButton = false;

  constructor() { }

  ngOnInit(): void {
  }

}

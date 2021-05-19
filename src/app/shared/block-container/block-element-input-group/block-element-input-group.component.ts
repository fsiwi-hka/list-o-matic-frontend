import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-block-element-input-group',
  templateUrl: './block-element-input-group.component.html',
  styleUrls: ['./block-element-input-group.component.scss']
})
export class BlockElementInputGroupComponent implements OnInit {

  @Input() placeholder: string | undefined;
  @Input() icon = faPlus;
  @Output() submit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}

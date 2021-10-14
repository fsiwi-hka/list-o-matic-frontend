import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-block-element',
  templateUrl: './block-element.component.html',
  styleUrls: ['./block-element.component.scss']
})
export class BlockElementComponent implements OnInit {

  /**
   * The title of this block
   */
  @Input() name = '';

  /**
   * The icon shown in the top left corner of this block
   */
  @Input() icon = faPlus;

  /**
   * If true, show the button in the top right corner of this block
   */
  @Input() hasButton = false;

  /**
   * The icon of the button in the top right corner of this block
   */
  @Input() buttonIcon = faPlus;

  /**
   * If true, this block will show up as a big button
   */
  @Input() @HostBinding('class.is-button') isButton = false;

  /**
   * If true, this block will be double width
   */
  @Input() @HostBinding('class.double-width') isDoubleWidth = false;

  /**
   * This output will be triggered when the button in the top right corner is clicked
   */
  @Output() buttonClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}

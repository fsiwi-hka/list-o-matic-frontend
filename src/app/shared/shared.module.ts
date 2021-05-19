import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { BlockContainerComponent } from './block-container/block-container.component';
import { BlockElementComponent } from './block-container/block-element/block-element.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlockElementInputGroupComponent } from './block-container/block-element-input-group/block-element-input-group.component';


@NgModule({
  declarations: [
    LayoutComponent,
    BlockContainerComponent,
    BlockElementComponent,
    BlockElementInputGroupComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LayoutComponent,
    BlockContainerComponent,
    BlockElementComponent,
    BlockElementInputGroupComponent
  ]
})
export class SharedModule { }

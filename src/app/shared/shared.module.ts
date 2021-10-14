import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { BlockContainerComponent } from './block-container/block-container.component';
import { BlockElementComponent } from './block-container/block-element/block-element.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BlockElementInputGroupComponent } from './block-container/block-element-input-group/block-element-input-group.component';
import { BlockElementTableComponent } from './block-container/block-element-table/block-element-table.component';
import { BlockElementTableRowComponent } from './block-container/block-element-table/block-element-table-row/block-element-table-row.component';
import { BlockElementTableCellComponent } from './block-container/block-element-table/block-element-table-cell/block-element-table-cell.component';
import { BlockElementTableHeadingComponent } from './block-container/block-element-table/block-element-table-heading/block-element-table-heading.component';


@NgModule({
  declarations: [
    LayoutComponent,
    BlockContainerComponent,
    BlockElementComponent,
    BlockElementInputGroupComponent,
    BlockElementTableComponent,
    BlockElementTableRowComponent,
    BlockElementTableCellComponent,
    BlockElementTableHeadingComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    LayoutComponent,
    BlockContainerComponent,
    BlockElementComponent,
    BlockElementInputGroupComponent,
    BlockElementTableComponent,
    BlockElementTableRowComponent,
    BlockElementTableCellComponent,
    BlockElementTableHeadingComponent
  ]
})
export class SharedModule { }

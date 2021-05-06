import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { TalkingListsComponent } from './talking-lists/talking-lists.component';
import { TalkingListDetailComponent } from './talking-list-detail/talking-list-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    TalkingListsComponent,
    TalkingListDetailComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    SharedModule,
    CoreModule,
    FontAwesomeModule
  ]
})
export class ViewsModule { }

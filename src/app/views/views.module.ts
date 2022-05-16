import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { TalkingListsComponent } from './talking-lists/talking-lists.component';
import { TalkingListDetailComponent } from './talking-list-detail/talking-list-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    TalkingListsComponent,
    TalkingListDetailComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    SharedModule,
    CoreModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewsModule { }

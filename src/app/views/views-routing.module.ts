import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalkingListDetailComponent } from './talking-list-detail/talking-list-detail.component';
import { TalkingListsComponent } from './talking-lists/talking-lists.component';

const routes: Routes = [
  { path: 'lists',      component: TalkingListsComponent      },
  { path: 'list/:uuid', component: TalkingListDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }

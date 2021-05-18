import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { TalkingList } from 'src/app/core/models/talking-list';
import { ListApiService } from 'src/app/core/services/list-api.service';

@Component({
  selector: 'app-talking-lists',
  templateUrl: './talking-lists.component.html',
  styleUrls: ['./talking-lists.component.scss']
})
export class TalkingListsComponent implements OnInit {

  faChalkboardTeacher = faChalkboardTeacher;

  lists: TalkingList[] = [];

  constructor(
    private listApi: ListApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listApi.listGet().subscribe((reply: any) => {
      this.lists = [];
      Object.entries(reply).forEach(listEntry => {
        const listUuid = listEntry[0];
        const list = listEntry[1] as any;
        this.lists.push(new TalkingList(listUuid, list.name));
      });
    });
  }

  goToListDetail(uuid: string) {
    this.router.navigate([`/list/${uuid}`]);
  }

}

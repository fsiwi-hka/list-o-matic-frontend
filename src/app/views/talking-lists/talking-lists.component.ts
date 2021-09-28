import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChalkboardTeacher, faKey, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TalkingList } from 'src/app/core/models/talking-list';
import { ListApiService } from 'src/app/core/services/list-api.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-talking-lists',
  templateUrl: './talking-lists.component.html',
  styleUrls: ['./talking-lists.component.scss']
})
export class TalkingListsComponent implements OnInit {

  faChalkboardTeacher = faChalkboardTeacher;
  faPlus = faPlus;
  faKey = faKey;

  lists: TalkingList[] = [];

  constructor(
    private listApi: ListApiService,
    public router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.refreshLists();
  }

  refreshLists(): void {
    this.listApi.listGet().subscribe((reply: any) => {
      this.lists = [];
      Object.entries(reply).forEach(listEntry => {
        const listUuid = listEntry[0];
        const list = listEntry[1] as any;
        this.lists.push(new TalkingList(listUuid, list.name));
      });

      this.lists.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
    });
  }

  goToListDetail(uuid: string) {
    this.router.navigate([`/list/${uuid}`]);
  }

  newList(name: string) {
    this.listApi.listPost(name).subscribe(_ => {
      this.refreshLists();
    });
  }

}

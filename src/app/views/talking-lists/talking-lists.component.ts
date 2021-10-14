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

  /**
   * Query the API for the list of avaiable talking lists
   */
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

  /**
   * Navigate to the detail page of a list
   * 
   * @param uuid UUID of the list to navigate to
   */
  goToListDetail(uuid: string) {
    this.router.navigate([`/list/${uuid}`]);
  }

  /**
   * Create a new talking list
   * 
   * @param name The name of the list to be created
   */
  newList(name: string) {
    this.listApi.listPost(name).subscribe(_ => {
      this.refreshLists();
    });
  }

}

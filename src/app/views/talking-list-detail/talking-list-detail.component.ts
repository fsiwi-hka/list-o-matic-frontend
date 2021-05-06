import { Component, OnInit } from '@angular/core';
import { TalkingList } from 'src/app/core/models/talking-list';
import { ListApiService } from 'src/app/core/services/list-api.service';
import { TalkingListApplication } from 'src/app/core/models/talking-list-application';
import { TalkingListContribution } from 'src/app/core/models/talking-list-contribution';
import { TalkingListGroup } from 'src/app/core/models/talking-list-group';
import { faPlay, faPlus, faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-talking-list-detail',
  templateUrl: './talking-list-detail.component.html',
  styleUrls: ['./talking-list-detail.component.scss']
})
export class TalkingListDetailComponent implements OnInit {

  faTrashAlt = faTrashAlt;
  faUsers = faUsers;
  faPlay = faPlay;
  faPlus = faPlus;

  listUuid = '';
  list: TalkingList | undefined;

  constructor(
    private listApi: ListApiService
  ) {
  }

  ngOnInit(): void {
    this.listUuid = '686efb11-41ed-4f6a-bde2-fae32d318009';
    this.refreshList();
  }

  refreshList(): void {
    this.listApi.listGet(this.listUuid).subscribe((reply: any) => {
      const list = new TalkingList(this.listUuid, reply.name);

      if (reply.groups) {
        Object.entries(reply.groups).forEach(groupEntry => {
          const groupUuid = groupEntry[0];
          const groupData: any = groupEntry[1];
          const group = new TalkingListGroup(groupUuid, groupData.name);

          if (groupData.applications) {
            Object.entries(groupData.applications).forEach(applicationEntry => {
              const applicationUuid = applicationEntry[0];
              const applicationData: any = applicationEntry[1];
              const application = new TalkingListApplication(applicationUuid, applicationData.name);
              group.applications.push(application);
            });
          }

          list.groups.push(group);
        });

        list.groups.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          return 0;
        });
      }

      if (reply.past_contributions) {
        (reply.past_contributions as any[]).forEach(contribEntry => {
          const contribution = new TalkingListContribution(
            contribEntry.in_progress,
            new TalkingListApplication('', contribEntry.application.name),
            contribEntry.group_uuid,
            contribEntry.start_time,
            contribEntry.end_time,
            contribEntry.duration
          );
          list.pastContributions.push(contribution);
        });
      }

      list.currentContribution = new TalkingListContribution(
        reply.current_contribution.in_progress,
        new TalkingListApplication('', reply.current_contribution.application.name),
        reply.current_contribution.group_uuid,
        reply.current_contribution.start_time,
        reply.current_contribution.end_time,
        reply.current_contribution.duration
      );

      this.list = list;
      console.log(this.list, reply);
    });
  }

  newApplication(groupUuid: string, name: string) {
    this.listApi.applicationPost(this.listUuid, groupUuid, name).subscribe(_ => {
      this.refreshList();
    });
  }

}

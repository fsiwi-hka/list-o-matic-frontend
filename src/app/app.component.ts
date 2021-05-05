import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { TalkingList } from './talking-list';
import { TalkingListApplication } from './talking-list-application';
import { TalkingListContribution } from './talking-list-contribution';
import { TalkingListGroup } from './talking-list-group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  talkingList: TalkingList = new TalkingList();

  constructor(
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.refreshTalkingLists();
  }

  refreshTalkingLists(): void {
    this.apiService.listGet(environment.listUuid).subscribe((reply: any) => {
      this.talkingList = new TalkingList();
      this.talkingList.name = reply.name;

      this.talkingList.currentContribution.inProgress = reply.current_contribution.in_progress;
      if (this.talkingList.currentContribution.inProgress) {
        this.talkingList.currentContribution.application.name = reply.current_contribution.application.name;
        this.talkingList.currentContribution.groupUuid = reply.current_contribution.group_uuid;
        this.talkingList.currentContribution.startTime = reply.current_contribution.start_time;
        this.talkingList.currentContribution.endTime = reply.current_contribution.end_time;
        this.talkingList.currentContribution.duration = reply.current_contribution.duration;
      }

      if (reply.groups) {
        Object.entries(reply.groups).forEach((groupEntry) => {
          const groupUuid = groupEntry[0];
          const group = groupEntry[1] as any;
          const groupObj = new TalkingListGroup(groupUuid, group.name);
          if (group.applications) {
            Object.entries(group.applications).forEach((applicationEntry) => {
              const applicationUuid = applicationEntry[0];
              const application = applicationEntry[1] as any;
              groupObj.applications.push(new TalkingListApplication(applicationUuid, application.name));
            });
          }
          this.talkingList.groups.push(groupObj);
        });

        this.talkingList.groups.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
          if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
          return 0;
        });
      }

      if (reply.past_contributions) {
        (reply.past_contributions as any[]).forEach((contrib) => {
          const contribEntry = new TalkingListContribution();
          contribEntry.inProgress = contrib.in_progress;
          contribEntry.application.name = contrib.application.name;
          contribEntry.groupUuid = contrib.group_uuid;
          contribEntry.startTime = contrib.start_time;
          contribEntry.endTime = contrib.end_time;
          contribEntry.duration = contrib.duration
          this.talkingList.pastContribution.push(contribEntry)
        })
      }

      this.apiService.timeDistribution(environment.listUuid).subscribe((distribution_reply: any) => {
        const totalTime = Number(distribution_reply.total_time);
        Object.entries(distribution_reply.time_share).forEach((distributionEntry) => {
          const groupUuid = distributionEntry[0];
          const timeShare = Number(distributionEntry[1]);
          this.talkingList.groups.forEach((group: TalkingListGroup) => {
            if (group.uuid === groupUuid) {
              group.totalTalkingTime = timeShare;
              group.talkingTimeShare = ((timeShare / totalTime) * 100.0);
            }
          });
        });
      });
    });
  }

  addGroup(name: string) {
    this.apiService.groupPost(environment.listUuid, name).subscribe(_ => {
      this.refreshTalkingLists();
    });
  }

  removeGroup(groupUuid: string) {
    this.apiService.groupDelete(environment.listUuid, groupUuid).subscribe(_ => {
      this.refreshTalkingLists();
    });
  }

  addApplication(groupUuid: string, name: string) {
    this.apiService.applicationPost(environment.listUuid, groupUuid, name).subscribe(_ => {
      this.refreshTalkingLists();
    });
  }

  removeApplication(groupUuid: string, applicationUuid: string) {
    this.apiService.applicationDelete(environment.listUuid, groupUuid, applicationUuid).subscribe(_ => {
      this.refreshTalkingLists();
    });
  }

  startContribution(groupUuid: string, applicationUuid: string) {
    this.apiService.startContribution(environment.listUuid, groupUuid, applicationUuid).subscribe(_ => {
      this.refreshTalkingLists();
    });
  }

  stopContribution() {
    this.apiService.stopContribution(environment.listUuid).subscribe(_ => {
      this.refreshTalkingLists();
    });
  }

  resetPastContributions() {
    this.apiService.resetPastContributions(environment.listUuid).subscribe(_ => {
      this.refreshTalkingLists();
    });
  }

  getGroupName(uuid: string) {
    var name = 'N/A';

    this.talkingList.groups.forEach((group: TalkingListGroup) => {
      if (group.uuid === uuid) {
        name = group.name;
      }
    });

    return name;
  }

  trimDecimal(inp: number): number {
    return Math.round((inp + Number.EPSILON) * 100) / 100;
  }
}

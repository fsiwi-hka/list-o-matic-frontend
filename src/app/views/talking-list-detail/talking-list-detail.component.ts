import { Component, OnInit } from '@angular/core';
import { TalkingList } from 'src/app/core/models/talking-list';
import { ListApiService } from 'src/app/core/services/list-api.service';
import { TalkingListApplication } from 'src/app/core/models/talking-list-application';
import { TalkingListContribution } from 'src/app/core/models/talking-list-contribution';
import { TalkingListGroup } from 'src/app/core/models/talking-list-group';
import { faArrowCircleLeft, faChalkboardTeacher, faPlay, faPlus, faRedo, faStop, faStopwatch, faTasks, faTrashAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

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
  faArrowCircleLeft = faArrowCircleLeft;
  faChalkboardTeacher = faChalkboardTeacher;
  faTasks = faTasks;
  faStopwatch = faStopwatch;
  faStop = faStop;
  faRedo = faRedo;

  listUuid = '';
  list: TalkingList | undefined;

  constructor(
    private route: ActivatedRoute,
    private listApi: ListApiService
  ) {
  }

  ngOnInit(): void {
    this.listUuid = this.route.snapshot.paramMap.get('uuid')!;
    this.refreshList();
  }

  /**
   * Refresh the talking list from the API.
   */
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

      this.listApi.timeDistributionGet(this.listUuid).subscribe((distribution: any) => {
        const totalTime = Number(distribution.total_time);
        Object.entries(distribution.time_share).forEach(distributionEntry => {
          const groupUuid = distributionEntry[0];
          const timeShare = Number(distributionEntry[1]);
          list.groups.forEach(group => {
            if (group.uuid === groupUuid) {
              group.totalTalkingTime = timeShare;
              group.talkingTimeShare = ((timeShare / totalTime) * 100.0);
            }
          });
        });
      });

      this.list = list;
    });
  }

  /**
   * Create a new group.
   * 
   * @param name The name of the group
   */
  newGroup(name: string) {
    this.listApi.groupPost(this.listUuid, name).subscribe(_ => {
      this.refreshList();
    });
  }

  /**
   * Delete a group.
   * 
   * @param groupUuid UUID of the group to be deleted.
   */
  deleteGroup(groupUuid: string) {
    this.listApi.groupDelete(this.listUuid, groupUuid).subscribe(_ => {
      this.refreshList();
    });
  }

  /**
   * Create a new application.
   * 
   * @param groupUuid UUID of the group to create the application in.
   * @param name The name of the applicant
   */
  newApplication(groupUuid: string, name: string) {
    this.listApi.applicationPost(this.listUuid, groupUuid, name).subscribe(_ => {
      this.refreshList();
    });
  }

  /**
   * Delete an application.
   * 
   * @param groupUuid UUID of the group containing the application.
   * @param applicationUuid UUID of the application.
   */
  deleteApplication(groupUuid: string, applicationUuid: string) {
    this.listApi.applicationDelete(this.listUuid, groupUuid, applicationUuid).subscribe(_ => {
      this.refreshList();
    });
  }

  /**
   * Start a contribution.
   * 
   * @param groupUuid UUID of the group containing the application.
   * @param applicationUuid UUID of the application.
   */
  startContribution(groupUuid: string, applicationUuid: string) {
    this.listApi.contributionStart(this.listUuid, groupUuid, applicationUuid).subscribe(_ => {
      this.refreshList();
    });
  }

  /**
   * Stop the current contribution.
   */
  stopContribution() {
    this.listApi.contributionStop(this.listUuid).subscribe(_ => {
      this.refreshList();
    });
  }

  /**
   * Reset the statistics.
   */
  resetContributionDistribution() {
    this.listApi.contributionReset(this.listUuid).subscribe(_ => {
      this.refreshList();
    });
  }

  /**
   * Retrieve the name of a group by an UUID.
   * 
   * @param uuid UUID of the Group to find
   * @returns The name of the Group or 'N/A'
   */
  groupNameByUuid(uuid: string) {
    let name = 'N/A';

    if (this.list) {
      this.list.groups.forEach(group => {
        if (group.uuid === uuid) {
          name = group.name;
        }
      });
    }

    return name;
  }

  /**
   * Fix the representation of a decimal number.
   * 
   * @param inp Input number.
   * @returns Number rounded to 2 decimal points.
   */
  fixDecimalFormat(inp: number): number {
    return Math.round((inp + Number.EPSILON) * 100) / 100;
  }

}

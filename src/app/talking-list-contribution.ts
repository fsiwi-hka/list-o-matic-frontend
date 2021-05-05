import { TalkingListApplication } from "./talking-list-application";

export class TalkingListContribution {
  inProgress: boolean;
  application: TalkingListApplication;
  groupUuid: string;
  startTime: number;
  endTime: number;
  duration: number;

  constructor() {
    this.inProgress = false;
    this.application = new TalkingListApplication('', '');
    this.groupUuid = '';
    this.startTime = 0;
    this.endTime = 0;
    this.duration = 0;
  }
}

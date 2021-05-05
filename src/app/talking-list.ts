import { TalkingListContribution } from "./talking-list-contribution";
import { TalkingListGroup } from "./talking-list-group";

export class TalkingList {
  name: string;
  groups: TalkingListGroup[];
  currentContribution: TalkingListContribution;
  pastContribution: TalkingListContribution[];

  constructor() {
    this.name = '';
    this.groups = [];
    this.currentContribution = new TalkingListContribution();
    this.pastContribution = [];
  }
}

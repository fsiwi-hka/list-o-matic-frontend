import { TalkingListContribution } from "./talking-list-contribution";
import { TalkingListGroup } from "./talking-list-group";

export class TalkingList {
    uuid: string;
    name: string;
    groups: TalkingListGroup[];
    currentContribution: TalkingListContribution | undefined;
    pastContributions: TalkingListContribution[];

    constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
        this.groups = [];
        this.pastContributions = [];
    }
}

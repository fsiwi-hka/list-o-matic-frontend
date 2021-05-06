import { TalkingListApplication } from "./talking-list-application";

export class TalkingListGroup {
    uuid: string;
    name: string;
    totalTalkingTime: number;
    talkingTimeShare: number;
    applications: TalkingListApplication[];

    constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
        this.totalTalkingTime = 0;
        this.talkingTimeShare = 0;
        this.applications = [];
    }
}

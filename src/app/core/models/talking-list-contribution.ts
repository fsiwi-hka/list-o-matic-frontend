import { TalkingListApplication } from "./talking-list-application";

export class TalkingListContribution {
    inProgress: boolean;
    application: TalkingListApplication;
    groupUuid: string;
    startTime: Date;
    endTime: Date;
    duration: number;

    constructor(inProgress: boolean, application: TalkingListApplication, groupUuid: string, startTime: string, endTime: string, duration: number) {
        this.inProgress = inProgress;
        this.application = application;
        this.groupUuid = groupUuid;
        this.startTime = new Date(startTime);
        this.endTime = new Date(endTime);
        this.duration = duration;
    }
}

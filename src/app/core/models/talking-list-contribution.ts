import { TalkingListApplication } from "src/app/talking-list-application";

export class TalkingListContribution {
    inProgress: boolean;
    application: TalkingListApplication;
    groupUuid: string;
    startTime: string;
    endTime: string;
    duration: number;

    constructor(inProgress: boolean, application: TalkingListApplication, groupUuid: string, startTime: string, endTime: string, duration: number) {
        this.inProgress = inProgress;
        this.application = application;
        this.groupUuid = groupUuid;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
    }
}

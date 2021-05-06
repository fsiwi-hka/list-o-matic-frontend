import { TalkingListApplication } from "./talking-list-application";

export class TalkingListGroup {
    uuid: string;
    name: string;
    applications: TalkingListApplication[];

    constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
        this.applications = [];
    }
}

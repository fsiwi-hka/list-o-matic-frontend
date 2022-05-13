export class TalkingListAttendee {
    uuid: string;
    givenName: string;
    surName: string;
    degree: string;
    mail: string;

    constructor(uuid: string, givenName: string, surName: string, degree: string) {
        this.uuid = uuid;
        this.givenName = givenName;
        this.surName = surName;
        this.degree = degree;
        this.mail = "";
    }
}

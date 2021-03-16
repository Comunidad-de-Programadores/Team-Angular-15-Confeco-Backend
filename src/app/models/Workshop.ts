import { Timestamp } from "./Timestamp";
import { User } from "./User";

export class Workshop extends Timestamp {
    _id: string;
    title: string;
    subtitle?: string;
    description?: string;
    instructor: User | string;
    workshopTime: Date;
    workshopsEndTime: Date;

    constructor(workshop: Workshop) {
        super();
        this._id = workshop._id;
        this.title = workshop.title;
        this.subtitle = workshop.subtitle;
        this.description = workshop.description;
        this.instructor = workshop.instructor;
        this.workshopTime = workshop.workshopTime;
        this.workshopsEndTime = workshop.workshopsEndTime;
    }
}

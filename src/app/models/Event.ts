import { Timestamp } from "./Timestamp";

export class Event extends Timestamp {
    _id: string;
    name: string;
    members?: string[];
    banned?: string[];
    banner: string;
    description: string;

    constructor(event: Event) {
        super();
        this._id = event._id;
        this.name = event.name;
        this.banned = event.banned;
        this.banner = event.banner;
        this.members = event.members;
        this.description = event.description;
    }
}

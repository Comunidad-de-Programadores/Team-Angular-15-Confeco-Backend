import { Timestamp } from "../Timestamp";

export class Badge extends Timestamp {
    _id: string;
    title: string;
    logo: string;
    description: string;
    challenge: string;

    constructor(badge: Badge) {
        super();
        this._id = badge._id;
        this.title = badge.title;
        this.description = badge.description;
        this.logo = badge.logo;
        this.challenge = badge.challenge;
    }
}

// Imports models.
import { User } from "../User";

export class EventUser {
    _id: string;
    user: string | User;
    eventId: string;

    constructor(data: EventUser) {
        this._id = data._id;
        this.user = data.user;
        this.eventId = data.eventId;
    }
};

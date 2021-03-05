// Imports models.
import { Event } from "../Event";
import { User } from "../User";

export class EventUser {
    _id: string;
    user: string | User;
    event: string | Event;

    constructor(data: EventUser) {
        this._id = data._id;
        this.user = data.user;
        this.event = data.event;
    }
};

// Imports database models.
import { models } from "../../database/mongo";

// Import interfaces
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models.
import { Event } from "../../models/Event";

export class ListEvents implements List<Event> {
    constructor(private data: { userId: string }) {}

    async list(): Promise<Event[]> {
        return await models.Event.find(
            { banned: { $ne: this.data.userId } },
            { banned: 0, members: 0 }
        ) as any[];
    }
}

export class GetEvent implements Get<string, Event> {
    constructor() {}

    async get(eventId: string) {
        return await models.Event.findOne(
            { _id: eventId },
            { banned: 0, members: 0 }
        ) as any;
    }
}

export class GetEventByIdAndBannedUser implements Get<string, Event> {
    constructor(private data: { userId: string }) {}

    async get(eventId: string): Promise<Event | null> {
        return await models.Event.findOne(
            { _id: eventId, banned: this.data.userId },
            { banned: 0, members: 0 }
        ) as any;
    }
}

export class GetEventByIdAndMemberId implements Get<string, Event> {
    constructor(private data: { memberId: string }) {}

    async get(eventId: string) {
        return await models.Event.findOne(
            { _id: eventId, members: this.data.memberId },
            { members: 0, banned: 0 }
        ) as any;
    }
}

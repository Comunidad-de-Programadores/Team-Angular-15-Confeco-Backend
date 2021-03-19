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
            { banned: 0 }
        ) as any[];
    }
}

export class ListEventsByUser implements List<Event> {
    constructor(private data: { userId: string }) {}

    async list(): Promise<Event[]> {
        return await models.Event.find(
            { members: this.data.userId },
            { members: 0, banned: 0 }
        ) as any[];
    }
}

export class GetEvent implements Get<Event> {
    constructor(private eventId: string) {}

    async get() {
        return await models.Event.findOne(
            { _id: this.eventId },
            { banned: 0, members: 0 }
        ) as any;
    }
}

export class GetEventByIdAndBannedUser implements Get<Event> {
    constructor(private data: { userId: string; eventId: string; }) {}

    async get(): Promise<Event | null> {
        const { eventId, userId } = this.data;
        return await models.Event.findOne(
            { _id: eventId, banned: userId },
            { banned: 0, members: 0 }
        ) as any;
    }
}

export class GetEventByIdAndMemberId implements Get<Event> {
    constructor(private data: { userId: string; eventId: string }) {}

    async get(): Promise<Event | null> {
        return await models.Event.findOne(
            { _id: this.data.eventId, members: this.data.userId },
            { members: 0, banned: 0 }
        ) as any;
    }
}

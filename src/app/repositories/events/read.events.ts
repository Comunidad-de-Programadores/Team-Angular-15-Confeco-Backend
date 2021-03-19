// Imports database models.
import { models } from "../../database/mongo";

// Import interfaces
import { List } from "../interfaces/repository.interfaces";

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

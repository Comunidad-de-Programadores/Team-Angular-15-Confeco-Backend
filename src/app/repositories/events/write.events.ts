// Imports database models.
import { models } from "../../database/mongo";

// Import model.
import { Event } from "../../models/Event";

// Import interface.
import { Create, Update } from "../interfaces/repository.interfaces";

export class CreateEvent implements Create<Event> {
    async create(event: Event): Promise<void> {
        await models.Event.create(event);
    }
}

export class AddUserToEvent implements Update {
    constructor(private data: { eventId: string, userId: string }) {}

    async update(): Promise<void> {
        const { eventId, userId } = this.data;
        await models.Event.updateOne(
            { _id: eventId },
            { $push: { members: userId } }
        );
    }
}

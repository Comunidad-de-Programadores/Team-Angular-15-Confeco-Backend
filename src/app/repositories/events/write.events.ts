// Imports database models.
import { models } from "../../database/mongo";

// Import model.
import { Event } from "../../models/Event";

// Import interface.
import { Create } from "../interfaces/repository.interfaces";

export class CreateEvent implements Create<Event> {
    async create(event: Event): Promise<void> {
        await models.Event.create(event);
    }
}

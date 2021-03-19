// Imports modules.
import { Request, Response } from "express";

// Imports models.
import { Event } from "../../models/Event";

// Imports repositories
import { DatabaseRepository } from "../../repositories/DatabaseRepository";
const database = new DatabaseRepository<Event>();

// Import repository actions.
import { ListEvents } from "../../repositories/events/read.events";

export class EventsController {
    async list(req: Request, res: Response): Promise<void> {
        try {
            const { user } = req.app.locals;
            const events: Event[] = await database.list(new ListEvents({ userId: user._id }));
            res.status(200).json({ events });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

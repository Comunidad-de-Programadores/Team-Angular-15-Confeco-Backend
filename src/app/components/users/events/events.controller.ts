// Imports modules.
import { Request, Response } from "express";

// Import model.
import { Event } from "../../../models/Event";

// Import repository.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
const database = new DatabaseRepository<string, Event>();

// Imports repository actions
import { ListEventsByUser } from "../../../repositories/events/read.events";

export class UsersEventsController {
    async list(req: Request, res: Response): Promise<any> {
        try {
            const { userId } = req.params;
            const events: Event[] = await database.list(new ListEventsByUser({ userId }));
            res.status(200).json({ events });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

// Imports modules.
import { Request, Response } from "express";

// Import postman.
import { EventsUsersPostman } from "./users.postman";
const postman: EventsUsersPostman = new EventsUsersPostman;

export class EventsUserController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { event, user } = await postman.create(req);
            res.status(200).json({ message: `${ user } se ha inscrito al evento ${ event }` });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}
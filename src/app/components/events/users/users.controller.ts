// Imports modules.
import { Request, Response } from "express";

// Imports postman
import { EventUserPostman } from "./users.postman";
const postman: EventUserPostman = new EventUserPostman;

export class EventUserController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const data = await postman.create(req);
            res.status(200).json({
                message: ``,
                data
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

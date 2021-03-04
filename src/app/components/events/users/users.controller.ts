// Imports modules.
import { Request, Response } from "express";
import { User } from "../../../models/User";

// Imports postman
import { EventUserPostman } from "./users.postman";
const postman: EventUserPostman = new EventUserPostman;

export class EventUserController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const data = await postman.create(req);
            const user = data.user as User;
            res.status(200).json({
                message: `${ user.nickname } se agrego correctamente al evento.`,
                data
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

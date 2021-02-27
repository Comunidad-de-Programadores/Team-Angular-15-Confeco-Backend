// Imports modules.
import { Request, Response } from "express";

// Imports postman
import { UserWorkshopPostman } from "./workshop.postman";
const postman: UserWorkshopPostman = new UserWorkshopPostman;

export class UserWorkshopController {
    async list(req: Request, res: Response): Promise<void> {
        try {
            const workshops = await postman.list(req);
            res.status(200).json({ workshops });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

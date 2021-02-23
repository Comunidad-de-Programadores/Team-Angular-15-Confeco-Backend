// Imports modules.
import { Request, Response } from "express";

// Imports postman.
import { WorkshopPostman } from "./workhops.postman";
const postman = new WorkshopPostman;

export class WorkshopsControllerComponent {
    async create(req: Request, res: Response) {
        try {
            const workshop = await postman.create(req);
            res.status(200).json({ workshop });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const workshops = await postman.list(req);
            res.status(200).json({ workshops });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
};

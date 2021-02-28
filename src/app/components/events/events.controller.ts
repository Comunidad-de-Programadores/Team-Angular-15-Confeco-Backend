// Imports modules.
import { Request, Response } from "express";

export class EventsController {
    async create(req: Request, res: Response): Promise<void> {
        res.status(200).json({
            message: "Creamos un evento."
        });
    }
}

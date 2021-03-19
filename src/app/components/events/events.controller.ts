// Imports modules.
import { Request, Response } from "express";

export class EventsController {
    async list(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({
                message: "Obtener eventos."
            })
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

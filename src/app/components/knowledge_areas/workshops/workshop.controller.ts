// Imports modules.
import { Request, Response } from "express";

export class KnowledgeAreaWorkshopController {
    async get(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json({
                ...req.params
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

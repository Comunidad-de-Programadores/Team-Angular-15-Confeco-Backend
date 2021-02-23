// Imports modules.
import { Request, Response } from "express";

export class KnowledgeAreaWorkshopController {
    async get(req: Request, res: Response): Promise<void> {
        res.status(200).json({ ...req.params });
    }
};

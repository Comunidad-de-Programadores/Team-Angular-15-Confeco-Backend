// Imports modules.
import { Request, Response } from "express";

// Imports repositories.
import { KnowledgeAreaRepositoryMongo } from "../../../database/mongo/repositories/KnowledgeAreaRepositoryMongo";
const { insertWorkshop, get } = new KnowledgeAreaRepositoryMongo;

export class KnowledgeAreaWorkshopController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            // Insert workshop.
            await insertWorkshop(req.params.id, req.body.workshop_id);

            // Get knowledge
            const workshop = await get(req.params.id);
            res.status(200).json({ workshop });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        res.status(200).json({ ...req.params });
    }
};

// Imports modules.
import { Request, Response } from "express";

// Import postman.
import { KnowledgeAreaPostman } from "./KnowledgeArea.postman";
const postman = new KnowledgeAreaPostman;

export class KnowledgeAreaController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const data = await postman.create(req);
            res.status(200).json({ data });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const items = await postman.list(req);
            res.status(200).json({ items });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
};

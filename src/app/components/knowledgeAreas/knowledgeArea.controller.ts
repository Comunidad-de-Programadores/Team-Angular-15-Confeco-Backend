// Imports modules.
import { Request, Response } from "express";

// Imports models.
import { KnowledgeArea } from "../../models/KnowledgeArea";

// Import postman.
import { KnowledgeAreaPostman } from "./knowledgeArea.postman";
const knowledgeAreapostman: KnowledgeAreaPostman = new KnowledgeAreaPostman;

export class KnowledgeAreaController {
    async get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
        try {
            const items: KnowledgeArea | KnowledgeArea[] = await knowledgeAreapostman.get(req);
            if (Array.isArray(items)) return res.status(200).json({ knowledgeAreas: items });
            res.status(200).json({ knowledgeArea: items });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}
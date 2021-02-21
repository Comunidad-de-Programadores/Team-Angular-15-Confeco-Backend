// Imports modules.
import { Request, Response } from "express";

// Import postman.
import { KnowledgeAreaPostman } from "./KnowledgeArea.postman";
const postman = new KnowledgeAreaPostman;

export class KnowledgeAreaController {
    async list(req: Request, res: Response): Promise<void> {
        const items = await postman.list(req);
        res.status(200).json({items });
    }
};

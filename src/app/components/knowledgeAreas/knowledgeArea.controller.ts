// Imports modules.
import { Request, Response } from "express";

export class KnowledgeAreaController {
    async get(req: Request, res: Response): Promise<void> {
        res.status(200).json({
            message: "Areas de conocimiento."
        })
    }
}
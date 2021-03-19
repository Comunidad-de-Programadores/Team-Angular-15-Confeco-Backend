// Import module.
import { Request, Response } from "express";

// Import model.
import { Workshop } from "../../../models/Workshop";

// Import repository
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
const database = new DatabaseRepository<string, Workshop>();

// Import reposotory actions.
import { ListWorkshopsByKnowledgeArea } from "../../../repositories/workshops/read.workshops";

// Import repository actions.

export class KnowledgeAreaWorkshopsController {
    async list(req: Request, res: Response): Promise<void> {
        try {
            const { knowledgeAreaId } = req.params;
            const workshops: Workshop[] = await database.list(new ListWorkshopsByKnowledgeArea({
                knowledgeAreaId
            }));
            res.status(200).json({ workshops });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

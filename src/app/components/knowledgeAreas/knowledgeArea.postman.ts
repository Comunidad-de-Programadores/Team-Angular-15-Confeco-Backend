// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";

// Import model.
import { KnowledgeArea } from "../../models/KnowledgeArea";

// Imports repositories.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";

// Import repository actions.
import { GetKnowledgeArea, ListKnowledgeArea } from "../../repositories/knowledgeArea/read.knowledgeArea";

export class KnowledgeAreaPostman {
    private database: DatabaseRepository<KnowledgeArea>;
    
    constructor() {
        this.database = new DatabaseRepository;
    }
    
    async get(req: Request): Promise<KnowledgeArea | KnowledgeArea[]> {
        const { id } = req.params;
        if (id) {
            const entity: KnowledgeArea | null = await this.database.get(new GetKnowledgeArea(id));
            if (!entity) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "ResourceNotFound"
            });
            
            return entity;
        }

        return await this.database.list(new ListKnowledgeArea);
    }
}
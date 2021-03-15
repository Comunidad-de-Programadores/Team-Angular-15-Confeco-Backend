// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";

// Imports models.
import { KnowledgeArea } from "../../models/KnowledgeArea";

// Imports repositories.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";
import { GetKnowledgeArea, ListKnowledgeArea } from "../../repositories/knowledgeArea/read.knowledgeArea";

export class KnowledgeAreaPostman {
    private database: DatabaseRepository<string, KnowledgeArea>;
    
    constructor() {
        this.database = new DatabaseRepository;
    }
    
    async get(req: Request): Promise<KnowledgeArea | KnowledgeArea[]> {
        const { id } = req.params;
        if (id) {
            const entity: KnowledgeArea | null = await this.database.get(id, new GetKnowledgeArea);
            if (!entity) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "ResourceNotFound"
            });
            
            return entity;
        }

        return await this.database.list(new ListKnowledgeArea);
    }
}
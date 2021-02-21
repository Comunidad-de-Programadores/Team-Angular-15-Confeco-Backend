// Imports modules.
import { Request } from "express";

// Imports interfaces.
import { IKnowledgeAreaRepository } from "../../database/interfaces/repositories.interfaces";

// Imports repositories.
import { KnowledgeAreaRepositoryMongo } from "../../database/mongo/repositories/KnowledgeAreaRepositoryMongo";

export class KnowledgeAreaPostman {
    private repository: IKnowledgeAreaRepository;

    constructor() {
        this.repository = new KnowledgeAreaRepositoryMongo;
    }

    async list(req: Request) {
        // Get one.
        const { id } = req.params;
        if (id) return await this.repository.get(id);

        // Get list
        const { limit, skip } = req.query;
        return await this.repository.list({
            limit: Number(limit),
            skip: Number(skip)
        });
    }
};

// Imports modules.
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IKnowledgeAreaRepository } from "../../database/interfaces/repositories.interfaces";

// Imports repositories.
import { KnowledgeAreaRepositoryMongo } from "../../database/mongo/repositories/KnowledgeAreaRepositoryMongo";

export class KnowledgeAreaPostman {
    private repository: IKnowledgeAreaRepository;

    constructor() {
        this.repository = new KnowledgeAreaRepositoryMongo;
    }

    async create(req: Request) {
        // Save in the database.
        const _id: string = uuid();
        await this.repository.create({ _id, ...req.body });

        // Get data.
        return await this.repository.get(_id);
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

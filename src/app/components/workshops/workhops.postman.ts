// Imports modules.
import { Request } from "express";

// Imports interfaces.
import { IWorkshopRepository } from "../../database/interfaces/repositories.interfaces";

// Imports repositories.
import { WorkshopRepositoryMongo } from "../../database/mongo/repositories/WorkshopRepositoryMongo";

export class WorkshopPostman {
    private repository: IWorkshopRepository;

    constructor() {
        this.repository = new WorkshopRepositoryMongo;
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

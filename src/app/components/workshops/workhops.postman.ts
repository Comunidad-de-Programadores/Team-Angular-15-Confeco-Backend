// Imports modules.
import createHttpError from "http-errors";
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IWorkshopRepository } from "../../database/interfaces/repositories.interfaces";

// Imports repositories.
import { WorkshopRepositoryMongo } from "../../database/mongo/repositories/WorkshopRepositoryMongo";

export class WorkshopPostman {
    private repository: IWorkshopRepository;

    constructor() {
        this.repository = new WorkshopRepositoryMongo;
    }

    async create(req: Request) {
        // Save in the database.
        const _id = uuid();
        await this.repository.create({ _id, ...req.body });

        // Get data
        return await this.repository.get(_id);
    }

    async list(req: Request) {
        // Get one.
        const { id } = req.params;
        if (id) {
            const workshop = await this.repository.get(id)
            
            if (!workshop) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "NotFount"
            });

            return workshop;
        };

        // Get list
        const { limit, skip } = req.query;
        return await this.repository.list({
            limit: Number(limit),
            skip: Number(skip)
        });
    }
};

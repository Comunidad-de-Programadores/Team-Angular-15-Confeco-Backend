// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";

// Import model.
import { ContentCreator } from "../../models/ContentCreator";

// Import repository.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";

// Import repository actions.
import { GetContentCreator, ListContentCreator } from "../../repositories/contentCreators/read.contentCreators";

export class ContentCreatorsPostman {
    private database: DatabaseRepository<ContentCreator>;

    constructor() {
        this.database = new DatabaseRepository;
    }

    async get(req: Request): Promise<ContentCreator | ContentCreator[]> {
        const { creatorId } = req.params;
        
        if (creatorId) {
            const entity: ContentCreator | null = await this.database.get(new GetContentCreator(creatorId));
            if (!entity) throw createHttpError(404, "El recurso solicitado no fue encontrado", {
                name: "ResourceNotFound"
            });
            return entity;
        }

        return this.database.list(new ListContentCreator);
    }
}

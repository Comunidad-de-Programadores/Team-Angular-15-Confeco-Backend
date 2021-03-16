import { Request } from "express";
import createHttpError from "http-errors";
import { ContentCreator } from "../../models/ContentCreator";
import { GetContentCreator, ListContentCreator } from "../../repositories/contentCreators/read.contentCreators";
import { DatabaseRepository } from "../../repositories/DatabaseRepository";

export class ContentCreatorsPostman {
    private database: DatabaseRepository<string, ContentCreator>;

    constructor() {
        this.database = new DatabaseRepository;
    }

    async get(req: Request): Promise<ContentCreator | ContentCreator[]> {
        const { creatorId } = req.params;
        
        if (creatorId) {
            const entity: ContentCreator | null = await this.database.get(creatorId, new GetContentCreator);
            if (!entity) throw createHttpError(404, "El recurso solicitado no fue encontrado", {
                name: "ResourceNotFound"
            });
            return entity;
        }

        return this.database.list(new ListContentCreator);
    }
}

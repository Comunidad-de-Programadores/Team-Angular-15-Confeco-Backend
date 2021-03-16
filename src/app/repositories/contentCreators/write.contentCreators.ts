// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { ContentCreator } from "../../models/ContentCreator";
import { Create } from "../interfaces/repository.interfaces";

export class CreateContentCreator implements Create<ContentCreator> {
    async create(entity: ContentCreator): Promise<void> {
        await models.ContentCreator.create(entity);
    }
}

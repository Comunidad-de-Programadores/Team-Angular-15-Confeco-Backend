// Import database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models.
import { ContentCreator } from "../../models/ContentCreator";

export class GetContentCreator implements Get<string, ContentCreator> {
    async get(id: string): Promise<ContentCreator | null> {
        return await models.ContentCreator.findById(id) as any;
    }
}

export class ListContentCreator implements List<ContentCreator> {
    async list(): Promise<ContentCreator[]> {
        return await models.ContentCreator.find() as any[];
    }
}

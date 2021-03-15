// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Create } from "../interfaces/repository.interfaces";

// Imports models.
import { KnowledgeArea } from "../../models/KnowledgeArea";

export class CreateKnowledgeArea implements Create<KnowledgeArea> {
    async create(entity: KnowledgeArea): Promise<void> {
        await models.KnowledgeArea.create(entity);
    }
}
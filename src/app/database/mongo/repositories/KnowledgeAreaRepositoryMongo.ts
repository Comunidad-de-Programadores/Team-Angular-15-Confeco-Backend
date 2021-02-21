// Imports models database.
import { models } from "../index";

// Imports models.
import { KnowledgeArea } from "../../../models/KnowledgeArea";

// Imports interfaces.
import { IKnowledgeAreaRepository, IOptionsList } from "../../interfaces/repositories.interfaces";

export class KnowledgeAreaRepositoryMongo implements IKnowledgeAreaRepository {
    async create(data: KnowledgeArea): Promise<void> {
        await models.Knowledge.create(data);
    }

    async get(id: string): Promise<KnowledgeArea | null> {
        const data: any = await models.Knowledge.findById(id);
        return data ? new KnowledgeArea(data) : null;
    }

    async list(options: IOptionsList): Promise<KnowledgeArea[]> {
        const { limit, skip } = options;
        const items: any[] = await models.Knowledge
        .find({})
        .skip(skip || 0)
        .limit(limit || 15)
        .sort({ created_at: -1 });
        return items;
    }

    async update(id: string, data: KnowledgeArea): Promise<void> {
        // More code...
    }
    
    async delete(id: string): Promise<void> {
        // More code...
    }
};

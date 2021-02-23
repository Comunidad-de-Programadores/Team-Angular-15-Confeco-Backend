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

    async insertWorkshop(_id: string, workshop_id: string) {
        await models.Knowledge.updateOne(
            { _id },
            { $push: { workshops: workshop_id } }
        );
    }

    async get(_id: string): Promise<KnowledgeArea | null> {
        const data: any = await models.Knowledge.findById(_id);
        return data ? new KnowledgeArea(data) : null;
    }

    async list(options: IOptionsList): Promise<KnowledgeArea[]> {
        const items: any[] = await models.Knowledge
        .find({})
        .skip(options.skip || 0)
        .limit(options.limit || 15)
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

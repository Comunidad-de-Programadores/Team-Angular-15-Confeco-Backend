// Imports database models.
import { models } from "../../database/mongo";

// Imports models.
import { KnowledgeArea } from "../../models/KnowledgeArea";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

export class GetKnowledgeArea implements Get<KnowledgeArea> {
    constructor(private knowledgeAreaId: string) {}

    async get(): Promise<KnowledgeArea | null> {
        return await models.KnowledgeArea.findById(this.knowledgeAreaId) as any;
    }
}

export class ListKnowledgeArea implements List<KnowledgeArea> {
    async list(): Promise<KnowledgeArea[]> {
        return await models.KnowledgeArea.find({}, { __v: 0 }) as any[];
    }
}

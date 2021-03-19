// Imports database models
import { models } from "../../database/mongo";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models.
import { Workshop } from "../../models/Workshop";

export class GetWorkshop implements Get<Workshop> {
    constructor(private workshopId: string) {}

    async get(): Promise<Workshop | null> {
        return await models.Workshop.findById(this.workshopId) as any;
    }
}

export class ListWorkshop implements List<Workshop> {
    async list(): Promise<Workshop[]> {
        return await models.Workshop.find() as any[];
    }
}

export class ListWorkshopsByKnowledgeArea implements List<Workshop> {
    constructor(private data: { knowledgeAreaId: string }) {}

    async list(): Promise<Workshop[]> {
        return await models.Workshop.find({
            knowledgeArea: this.data.knowledgeAreaId
        }) as any[];
    }
}

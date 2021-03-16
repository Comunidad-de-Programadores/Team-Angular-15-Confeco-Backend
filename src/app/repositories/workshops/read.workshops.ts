// Imports database models
import { models } from "../../database/mongo";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models.
import { Workshop } from "../../models/Workshop";

export class GetWorkshop implements Get<string, Workshop> {
    async get(workshopId: string): Promise<Workshop | null> {
        return await models.Workshop.findById(workshopId) as any;
    }
}

export class ListWorkshop implements List<Workshop> {
    async list(): Promise<Workshop[]> {
        return await models.Workshop.find() as any[];
    }
}

// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models.
import { Community } from "../../models/Community";

export class GetComunity implements Get<string, Community> {
    async get(comunityId: string): Promise<Community | null> {
        return await models.Comunity.findById(comunityId) as any;
    }
}

export class ListCommuties implements List<Community> {
    async list(): Promise<Community[]> {
        return await models.Comunity.find() as any[];
    }
}

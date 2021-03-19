// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models.
import { Community } from "../../models/Community";

export class GetComunity implements Get<Community> {
    constructor(private communityId: string) {}
    async get(): Promise<Community | null> {
        return await models.Comunity.findById(this.communityId) as any;
    }
}

export class ListCommuties implements List<Community> {
    async list(): Promise<Community[]> {
        return await models.Comunity.find() as any[];
    }
}

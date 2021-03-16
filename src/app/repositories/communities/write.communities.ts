// Imports database models.
import { models } from "../../database/mongo";

// Imports models.
import { Community } from "../../models/Community";

// Imports interfaces.
import { Create } from "../interfaces/repository.interfaces";

export class CreateComunity implements Create<Community> {
    async create(entity: Community): Promise<void> {
        await models.Comunity.create(entity);
    }
}
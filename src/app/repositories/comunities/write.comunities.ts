// Imports database models.
import { models } from "../../database/mongo";

// Imports models.
import { Comunity } from "../../models/Comunity";

// Imports interfaces.
import { Create } from "../interfaces/repository.interfaces";

export class CreateComunity implements Create<Comunity> {
    async create(entity: Comunity): Promise<void> {
        await models.Comunity.create(entity);
    }
}
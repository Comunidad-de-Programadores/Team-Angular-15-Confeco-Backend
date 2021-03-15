// Imports models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { UserDatabase } from "../interfaces/entities.interfaces";
import { Create } from "../interfaces/repository.interfaces";

export class CreateUser implements Create<UserDatabase> {
    async create(entity: UserDatabase): Promise<void> {
        await models.User.create(entity);
    }
}

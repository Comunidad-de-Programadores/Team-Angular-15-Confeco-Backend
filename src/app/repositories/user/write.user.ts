// Imports models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { UserDatabase } from "../interfaces/entities.interfaces";
import { Create, Update } from "../interfaces/repository.interfaces";

export class CreateUser implements Create<UserDatabase> {
    async create(entity: UserDatabase): Promise<void> {
        await models.User.create(entity);
    }
}

export class UpdateUser implements Update<string, UserDatabase> {
    async update(userId: string, data: UserDatabase): Promise<void> {
        await models.User.updateOne({ _id: userId }, data);
    }
}

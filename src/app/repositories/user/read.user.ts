// Imports models database.
import { models } from "../../database/mongo";

// Imports interfaces.
import { UserDatabase } from "../interfaces/entities.interfaces";
import { Get } from "../interfaces/repository.interfaces";

export class GetUser implements Get<UserDatabase> {
    constructor(private userId: string) {}

    async get(): Promise<UserDatabase | null> {
        return await models.User.findById(this.userId) as any;
    }
}

export class GetUserByEmail implements Get<UserDatabase> {
    constructor(private email: string) {}

    async get(): Promise<UserDatabase | null> {
        return await models.User.findOne({
            email: this.email
        }) as any;
    }
}
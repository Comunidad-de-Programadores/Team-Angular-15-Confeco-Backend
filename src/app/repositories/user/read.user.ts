// Imports models database.
import { models } from "../../database/mongo";

// Imports interfaces.
import { UserDatabase } from "../interfaces/entities.interfaces";
import { Get } from "../interfaces/repository.interfaces";

export class GetUserByEmail implements Get<string, UserDatabase> {
    async get(email: string): Promise<UserDatabase | null> {
        const user: any = await models.User.findOne({ email });
        return user;
    }
}
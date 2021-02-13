// Imports models.
import { models } from "../index";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { User } from "../../../models/User";

export class UserRepositoryMongo implements IDatabaseUserRepository {
    async create(user: User): Promise<void> {
        await new models.User(user).save();
    }

    async get(id: string): Promise<User | null> {
        const data: any = await models.User.findById(id, { __v: 0 });
        return data ? new User(data) : null;
    }

    async getByEmail(email: string): Promise<User | null> {
        const data: any = await models.User.findOne({ email });
        return data ? new User(data) : null;
    }

    async update(id: string, data: User) {
        data.updated_at = Date.now();
        console.log(data);
        await models.User.updateOne({ _id: id }, data);
    }
};
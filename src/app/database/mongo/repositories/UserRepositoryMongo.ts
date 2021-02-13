// Imports models.
import { models } from "../index";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { User } from "../../../models/User";

export class UserRepositoryMongo implements IDatabaseUserRepository {
    /**
     * 🧔 Save a new user.
     * @param user 
     */
    async create(user: User): Promise<void> {
        await new models.User(user).save();
    }

    /**
     * 🆔 Get user by id.
     * @param id 
     */
    async get(id: string): Promise<User | null> {
        const data: any = await models.User.findById(id, { __v: 0 });
        return data ? new User(data) : null;
    }

    /**
     * 📧 Get user by email.
     * @param email 
     */
    async getByEmail(email: string): Promise<User | null> {
        const data: any = await models.User.findOne({ email });
        return data ? new User(data) : null;
    }
};
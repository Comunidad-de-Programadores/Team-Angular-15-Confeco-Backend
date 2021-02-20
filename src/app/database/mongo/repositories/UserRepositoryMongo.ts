// Imports models.
import { models } from "../index";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../interfaces/repositories.interfaces";
import { IUserDatabase } from "../../interfaces/entities.interfaces";

export class UserRepositoryMongo implements IDatabaseUserRepository {
    async create(user: IUserDatabase): Promise<void> {
        await new models.User(user).save();
    }

    async get(id: string): Promise<IUserDatabase | null> {
        const data: any = await models.User.findById(id, { __v: 0 });
        return data;
    }

    async getByEmail(email: string): Promise<IUserDatabase | null> {
        const data: any = await models.User.findOne({ email });
        return data;
    }

    async update(id: string, data: IUserDatabase) {
        data.updated_at = Date.now();
        await models.User.updateOne({ _id: id }, data);
    }

    async updatePassword(email: string, password: string) {
        await models.User.updateOne(
            { email },
            { $set: { password, updated_at: Date.now() } }
        );
    }

    async updatePasswordResetToken(_id: string, token: string): Promise<void> {
        await models.User.updateOne({ _id }, { $set: { passwordResetToken: token } });
    }

    async updateStatusEmail(id: string, verified_email: boolean): Promise<void> {
        await models.User.updateOne({ _id: id }, { $set: { verified_email } });
    }

    async delete(id: string): Promise<void> {
        await models.User.deleteOne({ _id: id });
    }
};
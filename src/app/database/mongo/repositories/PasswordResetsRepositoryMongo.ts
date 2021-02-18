// Imports models
import { models } from "../index";

// Imports interfaces.
import { IDatabasePasswordResetRepository } from "../../interfaces/repositories.interfaces";
import { PasswordReset } from "../../../models/PasswordReset";

export class PasswordResetsRepositoryMongo implements IDatabasePasswordResetRepository {
    async create(data: PasswordReset): Promise<void> {
        await new models.PasswordReset(data).save();
    }

    async get(_id: string): Promise<PasswordReset | null> {
        const user: any = await models.PasswordReset.findOne({ _id });
        return user ? new PasswordReset(user) : null;
    }

    async getByEmail(email: string): Promise<PasswordReset | null> {
        const data: any = await models.PasswordReset.findOne({ email });
        return data ? new PasswordReset(data) : null;
    }

    async update(_id: string, data: PasswordReset): Promise<void> {
        data.updated_at = Date.now();
        await models.PasswordReset.updateOne({ _id }, data);
    }

    async delete(_id: string): Promise<void> {
        await models.PasswordReset.deleteOne({ _id });
    }
};

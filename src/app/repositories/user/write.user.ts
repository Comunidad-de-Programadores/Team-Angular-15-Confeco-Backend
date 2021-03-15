// Imports models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { BasicUpdateParams, UserDatabase } from "../interfaces/entities.interfaces";
import { Create, Update } from "../interfaces/repository.interfaces";

export class CreateUser implements Create<UserDatabase> {
    async create(entity: UserDatabase): Promise<void> {
        await models.User.create(entity);
    }
}

export class UpdateStatusEmail implements Update {
    constructor(private data: BasicUpdateParams<boolean>) {}

    async update(): Promise<void> {
        const { key, value } = this.data;
        await models.User.updateOne(
            { _id: key },
            { $set: { verified_email: value } }
        );
    }
}

export class UpdateUser implements Update {
    constructor(private data: BasicUpdateParams<UserDatabase>) {}

    async update(): Promise<void> {
        const { key, value } = this.data;
        await models.User.updateOne({ _id: key }, value);
    }
}

export class UpdatePassword implements Update {
    constructor(private data: BasicUpdateParams<string>) {}

    async update(): Promise<void> {
        const { key, value } = this.data;
        await models.User.updateOne(
            { _id: key },
            { $set: { password: value } }
        );
    }
}

export class UpdatePasswordResetToken implements Update {
    constructor(private data: BasicUpdateParams<string | undefined>) {}

    async update() {
        const { key, value } = this.data;
        await models.User.updateOne(
            { _id: key },
            { $set: { passwordResetToken: value } }
        );
    }
}

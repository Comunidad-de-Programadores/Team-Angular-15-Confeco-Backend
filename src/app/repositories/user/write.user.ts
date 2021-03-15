// Imports models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { BasicUpdateParams, UserDatabase, UserUpdateableParams } from "../interfaces/entities.interfaces";
import { Create, Update } from "../interfaces/repository.interfaces";

export class CreateUser implements Create<UserDatabase> {
    async create(entity: UserDatabase): Promise<void> {
        await models.User.create(entity);
    }
}

export class UpdateEmail implements Update {
    constructor(private data: BasicUpdateParams<{email: string;status: boolean}>) {}

    async update(): Promise<void> {
        const { key, value } = this.data;
        await models.User.updateOne(
            { _id: key },
            { $set: { email: value.email, verified_email: value.status } }
        );
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
    constructor(private data: BasicUpdateParams<UserUpdateableParams>) {}

    async update(): Promise<void> {
        const { key, value } = this.data;
        await models.User.updateOne({ _id: key }, { $set: value });
    }
}

export class UpdateUserAvatar implements Update {
    constructor(private data: BasicUpdateParams<string>) {}

    async update(): Promise<void> {
        const { key, value: avatar } = this.data;
        await models.User.updateOne({ _id: key }, { $set: { avatar } });
    }
}

export class UpdateUserBanner implements Update {
    constructor(private data: BasicUpdateParams<string>) {}

    async update(): Promise<void> {
        const { key, value: banner } = this.data;
        await models.User.updateOne({ _id: key }, { $set: { banner } });
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

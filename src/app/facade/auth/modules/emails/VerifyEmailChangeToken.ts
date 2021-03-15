// Imports interfaces.
import { IDatabaseUserRepository } from "../../../../database/interfaces/repositories.interfaces";
import { IUserDatabase } from "../../../../database/interfaces/entities.interfaces";
import { IAuth } from "../../interfaces/auth.interfaces";

// Imports models.
import { User } from "../../../../models/User";

// Imports facades.
import { JwtFacade } from "../../../Jwt/JwtFacade";
import createHttpError from "http-errors";

export class VerifyEmailChangeToken implements IAuth<void> {
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private token: string
    ) {
        this.jwt = new JwtFacade;
    }

    async auth(): Promise<void> {
        const payload: User = this.jwt.checkEmailResetToken(this.token);

        const user: IUserDatabase | null = await this.repository.get(payload._id);
        if (!user) throw createHttpError(404, "El usuario no existe", {
            name: "UserNotFound"
        });
    }
}

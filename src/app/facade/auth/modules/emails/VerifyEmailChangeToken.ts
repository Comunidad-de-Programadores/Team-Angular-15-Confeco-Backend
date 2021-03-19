// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth } from "../../interfaces/auth.interfaces";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../../models/User";

// Imports facades.
import { JwtFacade } from "../../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { GetUser } from "../../../../repositories/user/read.user";

export class VerifyEmailChangeToken implements IAuth<void> {
    private database: DatabaseRepository<UserDatabase>;
    private jwt: JwtFacade;

    constructor(private token: string) {
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade;
    }

    async auth(): Promise<void> {
        const payload: User = this.jwt.checkEmailResetToken(this.token);

        const user: UserDatabase | null = await this.database.get(new GetUser(payload._id));
        if (!user) throw createHttpError(404, "El usuario no existe", {
            name: "UserNotFound"
        });
    }
}

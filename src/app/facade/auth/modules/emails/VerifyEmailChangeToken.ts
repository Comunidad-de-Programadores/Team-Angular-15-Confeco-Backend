// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth } from "../../interfaces/auth.interfaces";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../../models/User";

// Imports facades.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtChangeEmail } from "../../../../helpers/jsonwebtokens/strategies/JwtChangeEmail";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { GetUser } from "../../../../repositories/user/read.user";

export class VerifyEmailChangeToken implements IAuth<void> {
    private database: DatabaseRepository<UserDatabase>;
    private jsonwebtoken: JsonWebToken;

    constructor(private token: string) {
        this.database = new DatabaseRepository;
        this.jsonwebtoken = new JsonWebToken;
    }

    async auth(): Promise<void> {
        const payload: User = this.jsonwebtoken.verify(this.token, new JwtChangeEmail);
        console.log(payload);

        const user: UserDatabase | null = await this.database.get(new GetUser(payload._id));
        if (!user) throw createHttpError(404, "El usuario no existe", {
            name: "UserNotFound"
        });
    }
}

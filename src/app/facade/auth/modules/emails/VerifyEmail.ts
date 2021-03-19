// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth, IAuthRes } from "../../interfaces/auth.interfaces";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../../models/User";

// Imports facades.
import { JwtFacade } from "../../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { UpdateStatusEmail } from "../../../../repositories/user/write.user";
import { GetUser } from "../../../../repositories/user/read.user";

export class VerifyEmail implements IAuth<IAuthRes> {
    private database: DatabaseRepository<UserDatabase>;
    private jwt: JwtFacade;

    constructor(private token: string) {
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Verify email.
        const res = this.jwt.checkEmailVerificationLink(this.token);

        // Check status account.
        const result: UserDatabase | null = await this.database.get(new GetUser(res._id));
        if (result?.verified_email) throw createHttpError(403, "Tu correo electronico ya ha sido verificado.");

        // Update status user.
        await this.database.update(new UpdateStatusEmail({ key: res._id, value: true }));

        // Get fields user.
        const data: UserDatabase | null = await this.database.get(new GetUser(res._id));

        if (!data || !data.verified_email) throw createHttpError(403, "Ha ocurrido un error durante la operacion", {
            name: "ErrorExecution"
        });

        // Generate tokens.
        const user = Object.assign({}, new User(data));
        const tokens = this.jwt.generateTokens(user);
        return { user, tokens };
    }
};

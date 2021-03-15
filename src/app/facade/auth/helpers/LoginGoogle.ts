// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { IUserDatabase } from "../../../database/interfaces/entities.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports jsonwebtokens
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { UpdateUser } from "../../../repositories/user/write.user";

export class LoginGoogle implements IAuth<IAuthRes> {
    private database: DatabaseRepository<string, UserDatabase>;
    private jwt: JwtFacade;

    constructor(private user: IUserDatabase) {
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Update status email.
        if (!this.user.verified_email) await this.database.update(
            this.user._id,
            { ...this.user, verified_email: true },
            new UpdateUser
        );

        // Generate tokens.
        const data = Object.defineProperties(this.user, {
            verified_email: { value: true }
        });
        const user = Object.assign({}, new User(data));
        const tokens = this.jwt.generateTokens(user);
        return { user, tokens };
    }
};

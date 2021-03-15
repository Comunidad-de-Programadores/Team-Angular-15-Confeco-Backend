// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { GetUser } from "../../../repositories/user/read.user";

export class LoginFacebook implements IAuth<IAuthRes> {
    private database: DatabaseRepository<string, UserDatabase>;
    private jwt: JwtFacade;

    constructor(private user: User) {
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Update status email.
        if (!this.user.verified_email) await this.database.get(this.user._id, new GetUser);

        // Define properties.
        const data = Object.defineProperties(this.user, {
            verified_email: { value: true }
        });
        const user = Object.assign({}, new User(data));

        // Generate tokens.
        const tokens = this.jwt.generateTokens(user);
        return { user, tokens };
    }
};

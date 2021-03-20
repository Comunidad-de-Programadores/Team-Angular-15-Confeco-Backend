// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports jsonwebtokens
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../../helpers/jsonwebtokens/strategies/RefreshToken";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { UpdateStatusEmail } from "../../../repositories/user/write.user";

export class LoginGoogle implements IAuth<IAuthRes> {
    private database: DatabaseRepository<UserDatabase>;
    private jsonwebtoken: JsonWebToken;

    constructor(private user: UserDatabase) {
        this.database = new DatabaseRepository;
        this.jsonwebtoken = new JsonWebToken;
    }

    async auth(): Promise<IAuthRes> {
        // Update status email.
        if (!this.user.verified_email) {
            await this.database.update(new UpdateStatusEmail({
                key: this.user._id,
                value: true
            }));
        }

        // Generate tokens.
        const data = Object.defineProperties(this.user, {
            verified_email: { value: true }
        });
        const user = Object.assign({}, new User(data));

        // Generate tokens
        const access_token: string = this.jsonwebtoken.generate({ data: user }, new JwtAccessToken);
        const refresh_token: string = this.jsonwebtoken.generate({ data: user }, new JwtRefreshToken);
        const tokens = { access_token, refresh_token };
        return { user, tokens };
    }
};

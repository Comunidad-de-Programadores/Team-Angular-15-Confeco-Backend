// Imports interfaces.
import { IAuth, IAuthRes, ICredentials } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../../helpers/jsonwebtokens/strategies/RefreshToken";

// Imports interfaces.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../repositories/user/read.user";

export class LoginEmailAndPassword implements IAuth<IAuthRes> {
    private database: DatabaseRepository<UserDatabase>;
    private jsonwebtoken: JsonWebToken;

    constructor(private credentials: ICredentials) {
        this.database = new DatabaseRepository;
        this.jsonwebtoken = new JsonWebToken;
    }

    async auth(): Promise<IAuthRes> {
        // Verify user existence.
        const user: any = await this.database.get(new GetUserByEmail(this.credentials.email));
        const newUser = Object.assign({}, new User(user));

        // Generate access_token.
        const access_token: string = this.jsonwebtoken.generate({
            data: newUser,
            expiresIn: this.credentials.stayConnected ? undefined : "8h"
        }, new JwtAccessToken);

        // Generate refresh_token
        const refresh_token: string = this.jsonwebtoken.generate({
            data: newUser
        }, new JwtRefreshToken);
        
        const tokens = { access_token, refresh_token };
        return { user: newUser, tokens };
    }
};

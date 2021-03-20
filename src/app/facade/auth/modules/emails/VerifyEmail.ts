// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth, IAuthRes } from "../../interfaces/auth.interfaces";
import { UserDatabase } from "../../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../../models/User";

// Imports facades.
import { JsonWebToken } from "../../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtEmailToken } from "../../../../helpers/jsonwebtokens/strategies/JwtEmailToken";
import { JwtAccessToken } from "../../../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../../../helpers/jsonwebtokens/strategies/RefreshToken";

// Imports repositories.
import { DatabaseRepository } from "../../../../repositories/DatabaseRepository";
import { UpdateStatusEmail } from "../../../../repositories/user/write.user";
import { GetUser } from "../../../../repositories/user/read.user";

export class VerifyEmail implements IAuth<IAuthRes> {
    private database: DatabaseRepository<UserDatabase>;
    private jsonwebtoken: JsonWebToken;

    constructor(private token: string) {
        this.database = new DatabaseRepository;
        this.jsonwebtoken = new JsonWebToken;
    }

    async auth(): Promise<IAuthRes> {
        // Verify email.
        const res: User = this.jsonwebtoken.verify(this.token, new JwtEmailToken);

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

        const user = Object.assign({}, new User(data));
        
        // Generate access_token.
        const access_token: string = this.jsonwebtoken.generate({ data: user }, new JwtAccessToken);

        // Generate refresh_token
        const refresh_token: string = this.jsonwebtoken.generate({ data: user }, new JwtRefreshToken);
        
        const tokens = { access_token, refresh_token };
        return { user, tokens };
    }
};

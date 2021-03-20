// Imports modules.
import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";

// Import environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";
import { BadgeUser } from "../../../models/badges/BadgeUser";

// Imports facades.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../../helpers/jsonwebtokens/strategies/AccessToken";
import { JwtRefreshToken } from "../../../helpers/jsonwebtokens/strategies/RefreshToken";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";

// Import repository actions.
import { CreateUser } from "../../../repositories/user/write.user";
import { GetUser } from "../../../repositories/user/read.user";
import { WinBadge } from "../../../repositories/badges/write.badge";

export class RegisterFacebook implements IAuth<IAuthRes> {
    private databaseBadge: DatabaseRepository<BadgeUser>;
    private database: DatabaseRepository<UserDatabase>;
    private jsonwebtoken: JsonWebToken;
    
    constructor(private data: { last_name: string, email: string }) {
        this.databaseBadge = new DatabaseRepository;
        this.database = new DatabaseRepository;
        this.jsonwebtoken = new JsonWebToken;
    }

    async auth(): Promise<IAuthRes> {
        // Establishing data.
        const _id: string = uuid();
        const nickname: string = `${ this.data.last_name }${ Math.round(Math.random() * (1000 - 100)) }`;

        // Save user.
        await this.database.create({
            _id,
            nickname,
            password: "",
            email: this.data.email,
            verified_email: !!this.data.email
        }, new CreateUser);

        // Get fields user.
        const user: UserDatabase | null = await this.database.get(new GetUser(_id));

        if (!user) throw createHttpError(401, "Ha sucedido un error durante la operacion.", {
            name: "AuthenticationError"
        });

        // Win badge
        await this.databaseBadge.create({
            _id: uuid(),
            userId: user._id,
            badgeId: environments.BADGE_GENESIS_ID as string
        }, new WinBadge);

        const newUser = Object.assign({}, new User(user));

        // Generate tokens.
        const access_token: string = this.jsonwebtoken.generate({ data: newUser }, new JwtAccessToken);
        const refresh_token: string = this.jsonwebtoken.generate({ data: newUser }, new JwtRefreshToken);
        const tokens = { access_token, refresh_token };
        return { user: newUser, tokens };
    }
};

// Imports modules.
import { TokenPayload } from "google-auth-library";
import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";
import uniqid from "uniqid";

// Imports environments.
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";
import { BadgeUser } from "../../../models/badges/BadgeUser";

// Imports jsonwebtokens.
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../repositories/user/read.user";
import { CreateUser } from "../../../repositories/user/write.user";
import { WinBadge } from "../../../repositories/badges/write.badge";

export class RegisterGoogle implements IAuth<IAuthRes> {
    private database: DatabaseRepository<UserDatabase>;
    private databaseBadge: DatabaseRepository<BadgeUser>;
    private jwt: JwtFacade;

    constructor(private data: TokenPayload) {
        this.databaseBadge = new DatabaseRepository;
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        const nickname: string = `${ this.data.given_name }${ Math.round(Math.random() * (1000 - 100)) }`;
        const email: string = this.data.email || `${ uniqid() }@gmail.com`;
        
        // Save user.
        await this.database.create({
            email,
            nickname,
            _id: uuid(),
            password: "",
            verified_email: !!this.data.email_verified,
        }, new CreateUser);

        // Get fields user.
        const user = await this.database.get(new GetUserByEmail(email));
        if (!user) throw createHttpError(400, "Sucedio un error durante la operacion", {
            name: "ErrorRegister"
        });

        // Win badge
        await this.databaseBadge.create({
            _id: uuid(),
            userId: user._id,
            badgeId: environments.BADGE_GENESIS_ID as string
        }, new WinBadge);

        // Generate tokens.
        const newUser = Object.assign({}, new User(user));
        const tokens = this.jwt.generateTokens(newUser);
        return { user: newUser, tokens };
    }
};

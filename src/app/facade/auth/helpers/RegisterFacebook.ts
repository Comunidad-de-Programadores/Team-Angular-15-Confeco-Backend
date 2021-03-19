// Imports modules.
import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";
import { BadgeUser } from "../../../models/badges/BadgeUser";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { CreateUser } from "../../../repositories/user/write.user";
import { GetUser } from "../../../repositories/user/read.user";
import { WinBadge } from "../../../repositories/badges/write.badge";
import { environments } from "../../../config/environments";

export class RegisterFacebook implements IAuth<IAuthRes> {
    private databaseBadge: DatabaseRepository<BadgeUser>;
    private database: DatabaseRepository<UserDatabase>;
    private jwt: JwtFacade;
    
    constructor(private data: { last_name: string, email: string | undefined }) {
        this.databaseBadge = new DatabaseRepository;
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade();
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
            email: this.data.email || "",
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

        // Generate tokens.
        const newUser = Object.assign({}, new User(user));
        const tokens = this.jwt.generateTokens(newUser);
        return { user: newUser, tokens };
    }
};

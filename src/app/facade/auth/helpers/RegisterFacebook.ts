// Imports modules.
import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { CreateUser } from "../../../repositories/user/write.user";
import { GetUser } from "../../../repositories/user/read.user";

export class RegisterFacebook implements IAuth<IAuthRes> {
    private database: DatabaseRepository<string, UserDatabase>;
    private jwt: JwtFacade;
    
    constructor(private data: { last_name: string, email: string | undefined }) {
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
        const user: UserDatabase | null = await this.database.get(_id, new GetUser);

        if (!user) throw createHttpError(401, "Ha sucedido un error durante la operacion.", {
            name: "AuthenticationError"
        });

        // Generate tokens.
        const newUser = Object.assign({}, new User(user));
        const tokens = this.jwt.generateTokens(newUser);
        return { user: newUser, tokens };
    }
};

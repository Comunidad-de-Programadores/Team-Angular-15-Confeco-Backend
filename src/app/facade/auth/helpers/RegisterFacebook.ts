// Imports modules.
import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";
import { User } from "../../../models/User";

export class RegisterFacebook implements IAuth<IAuthRes> {
    private jwt: JwtFacade;
    
    constructor(
        private repository: IDatabaseUserRepository,
        private data: { last_name: string, email: string | undefined }
    ) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Establishing data.
        const _id: string = uuid();
        const nickname: string = `${ this.data.last_name }${ Math.round(Math.random() * (1000 - 100)) }`;

        // Save user.
        await this.repository.create({
            _id,
            nickname,
            password: "",
            email: this.data.email || "",
            verified_email: !!this.data.email
        });

        // Get fields user.
        const user = await this.repository.get(_id);

        if (!user) throw createHttpError(401, "Ha sucedido un error durante la operacion.", {
            name: "AuthenticationError"
        });

        // Generate tokens.
        const newUser = Object.assign({}, new User(user));
        const tokens = this.jwt.generateTokens(newUser);
        return { user: newUser, tokens };
    }
};

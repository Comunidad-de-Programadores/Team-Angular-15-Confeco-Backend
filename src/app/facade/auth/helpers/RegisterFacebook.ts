// Imports modules.
import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

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
        const email: string = this.data.email || "";
        const verified_email: boolean = !!this.data.email;

        // Save user.
        await this.repository.create({ _id, email, nickname, verified_email });

        // Get fields user.
        const user = await this.repository.get(_id);

        if (!user) throw createHttpError(401, "Ha sucedido un error durante la operacion.", {
            name: "AuthenticationError"
        });

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ _id: user._id, email: user.email });

        delete user.password;
        return { user, tokens };
    }
};

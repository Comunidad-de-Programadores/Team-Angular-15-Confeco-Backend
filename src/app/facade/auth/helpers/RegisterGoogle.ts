// Imports modules.
import { TokenPayload } from "google-auth-library";
import createHttpError from "http-errors";
import { v4 as uuid } from "uuid";
import uniqid from "uniqid";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";

// Imports jsonwebtokens.
import { JwtFacade } from "../../Jwt/JwtFacade";

export class RegisterGoogle implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private data: TokenPayload
    ) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Save user.
        const nickname: string = `${ this.data.given_name }${ Math.round(Math.random() * (1000 - 100)) }`
        const email: string = this.data.email || `${ uniqid() }@gmail.com`;
        const verified_email: boolean = !!this.data.email_verified;
        await this.repository.create({ _id: uuid(), email, nickname, verified_email });

        // Get fields user.
        const user = await this.repository.getByEmail(email);
        if (!user) throw createHttpError(400, "Sucedio un error durante la operacion", {
            name: "ErrorRegister"
        });

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ _id: user._id, email: user.email });

        delete user.password;
        return { user, tokens };
    }
};

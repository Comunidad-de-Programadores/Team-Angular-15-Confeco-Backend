// Imports modules.
import { LoginTicket, OAuth2Client } from "google-auth-library";
import createHttpError from "http-errors";

// Imports environments
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../interfaces/encrypt.interface";

// Imports jsonwebtokens.
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { RegisterGoogle } from "../helpers/RegisterGoogle";
import { LoginGoogle } from "../helpers/LoginGoogle";

export class AuthGoogle implements IAuth<IAuthRes> {
    private jwt: JsonWebToken;

    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private token: string
    ) {
        this.jwt = new JsonWebToken();
    }

    async auth(): Promise<IAuthRes> {
        const { GOOGLE_CLIENT_ID } = environments;
        const oauth: OAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);

        // Generate ticket.
        const ticket: LoginTicket = await oauth.verifyIdToken({
            audience: GOOGLE_CLIENT_ID,
            idToken: this.token
        });

        const fields = ticket.getPayload();
        if (!fields) throw createHttpError(403, "No posees los campos necesarios.", {
            name: "ErrorAuthGoogle"
        });

        // Get user..
        const user = await this.repository.getByEmail(fields?.email || "");

        // Register with google.
        if (!user) {
            const register = new RegisterGoogle(this.repository, this.encrypt, fields);
            return await register.auth();
        }

        // Login with google.
        const login = new LoginGoogle(this.repository, user);
        return await login.auth();
    }
}
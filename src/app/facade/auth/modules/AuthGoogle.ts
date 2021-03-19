// Imports modules.
import { LoginTicket, OAuth2Client } from "google-auth-library";
import createHttpError from "http-errors";

// Imports environments
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports authentication google.
import { RegisterGoogle } from "../helpers/RegisterGoogle";
import { LoginGoogle } from "../helpers/LoginGoogle";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../repositories/user/read.user";

export class AuthGoogle implements IAuth<IAuthRes> {
    private database: DatabaseRepository<UserDatabase>;

    constructor(private token: string) {
        this.database = new DatabaseRepository;
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

        // Get user.
        const user = await this.database.get(new GetUserByEmail(fields.email || ""));

        // Register with google.
        if (!user) {
            const register = new RegisterGoogle(fields);
            return await register.auth();
        }

        // Login with google.
        const login = new LoginGoogle(user);
        return await login.auth();
    }
}
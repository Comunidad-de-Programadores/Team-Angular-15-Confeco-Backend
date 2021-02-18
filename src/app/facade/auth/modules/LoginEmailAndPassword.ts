// Imports modules.
import createHttpError, { HttpError } from "http-errors";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { IAuth, IAuthRes, ICredentials } from "../interfaces/auth.interfaces";
import { IEncrypt } from "../../../interfaces/encrypt.interface";
import { User } from "../../../models/User";

// Imports jsonwebtokens.
import { JwtFacade } from "../../Jwt/JwtFacade";

export class LoginEmailAndPassword implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private credentials: ICredentials
    ) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Verify user existence.
        const { email, password } = this.credentials;
        const user: User | null = await this.repository.getByEmail(email);

        const credentialsIncorrect: HttpError = createHttpError(403, "Las credenciales son incorrectas.", {
            name: "CredentialsIncorrect"
        });
        
        if (!user) throw credentialsIncorrect;

        if (!user.verified_email) throw createHttpError(401, "Necesitas verificar tu email, para iniciar sesion.", {
            name: "UnverifiedEmail"
        });

        // Compare password
        const result = await this.encrypt.compare(password, user.password || "");
        if (!result) throw credentialsIncorrect;

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ _id: user._id, email: user.email });

        delete user.password;
        return { user, tokens };
    }
};

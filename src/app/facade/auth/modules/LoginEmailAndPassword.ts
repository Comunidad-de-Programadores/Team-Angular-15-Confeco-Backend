// Imports interfaces.
import { IAuth, IAuthRes, ICredentials } from "../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports jsonwebtokens.
import { JwtFacade } from "../../Jwt/JwtFacade";
import { IUserDatabase } from "../../../database/interfaces/entities.interfaces";

export class LoginEmailAndPassword implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private credentials: ICredentials
    ) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Verify user existence.
        const { email } = this.credentials;
        const user = await this.repository.getByEmail(email) as IUserDatabase;

        // Generate tokens.
        const newUser = Object.assign({}, new User(user));
        const tokens = this.jwt.generateTokens(newUser);
        return { user: newUser, tokens };
    }
};

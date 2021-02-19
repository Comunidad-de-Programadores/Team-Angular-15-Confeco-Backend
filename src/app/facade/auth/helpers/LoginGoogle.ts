// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { IUserDatabase } from "../../../database/interfaces/user.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { User } from "../../../models/User";

// Imports jsonwebtokens
import { JwtFacade } from "../../Jwt/JwtFacade";

export class LoginGoogle implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(private repository: IDatabaseUserRepository, private user: IUserDatabase) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Update status email.
        if (!this.user.verified_email) await this.repository.updateStatusEmail(this.user._id, true);

        // Generate tokens.
        const data = Object.defineProperties(this.user, {
            verified_email: { value: true }
        });
        const user = new User(data);
        const tokens = this.jwt.generateTokens({ _id: user._id, email: user.email });
        return { user, tokens };
    }
};

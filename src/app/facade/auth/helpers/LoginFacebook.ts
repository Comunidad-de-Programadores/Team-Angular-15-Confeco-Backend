// Imports interfaces.
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { User } from "../../../models/User";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

export class LoginFacebook implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private user: User
    ) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        const user: User = Object.defineProperties(this.user, {
            verified_email: { value: true }
        });

        await this.repository.updateStatusEmail(user._id, true);

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ _id: user._id, email: user.email });

        delete user.password;
        return { user, tokens };
    }
};

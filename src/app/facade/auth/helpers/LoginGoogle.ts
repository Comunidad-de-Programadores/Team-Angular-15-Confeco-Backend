// Imports interfaces.
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { User } from "../../../models/User";

// Imports jsonwebtokens
import { JwtFacade } from "../../Jwt/JwtFacade";

export class LoginGoogle implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(private repository: IDatabaseUserRepository ,private user: User) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Define properties.
        const values = Object.assign({}, this.user);
        const user = Object.defineProperties(values, {
            verified_email: { value: true }
        });

        // Update status email.
        if (!this.user.verified_email) await this.repository.updateStatusEmail(user._id, true);

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ _id: user._id, email: user.email });

        delete user.password;
        return { user, tokens };
    }
};

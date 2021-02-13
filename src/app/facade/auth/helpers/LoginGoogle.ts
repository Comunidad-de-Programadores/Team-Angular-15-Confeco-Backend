// Imports interfaces.
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";
import { User } from "../../../models/User";

// Imports jsonwebtokens
import { JwtFacade } from "../../Jwt/JwtFacade";

export class LoginGoogle implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private user: User
    ) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        const user = Object.defineProperties(this.user, {
            provider: { value: "google" },
            password: { value: "" }
        });

        // Update fields user.
        if (user.provider !== "google") await this.repository.update(user._id, user);

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ _id: user._id, email: user.email });

        delete user.password;
        return { user, tokens };
    }
};

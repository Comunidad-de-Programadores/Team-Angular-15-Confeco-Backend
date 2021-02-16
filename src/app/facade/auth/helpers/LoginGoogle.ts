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
        const user = Object.assign({}, this.user);
        const values = Object.defineProperties(user, {
            provider: { value: "google" }
        });

        // Update fields user.
        if (this.user.provider !== "google") await this.repository.update(values._id, values);

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ _id: values._id, email: values.email });

        delete values.password;
        return { user: values, tokens };
    }
};

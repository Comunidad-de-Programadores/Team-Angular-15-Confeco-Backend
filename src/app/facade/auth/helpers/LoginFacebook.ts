// Imports interfaces.
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { User } from "../../../models/User";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

export class LoginFacebook implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(private user: User) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        const user = Object.assign({}, this.user);

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ _id: user._id, email: user.email });

        delete user.password;
        return { user, tokens };
    }
};

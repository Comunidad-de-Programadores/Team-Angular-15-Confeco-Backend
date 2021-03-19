// Imports interfaces.
import { IAuth, IAuthRes, ICredentials } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports jsonwebtokens.
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports interfaces.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../repositories/user/read.user";

export class LoginEmailAndPassword implements IAuth<IAuthRes> {
    private database: DatabaseRepository<UserDatabase>;
    private jwt: JwtFacade;

    constructor(private credentials: ICredentials) {
        this.database = new DatabaseRepository;
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Verify user existence.
        const user: any = await this.database.get(new GetUserByEmail(this.credentials.email));

        // Generate tokens.
        const newUser = Object.assign({}, new User(user));
        const tokens = this.jwt.generateTokens(newUser);
        return { user: newUser, tokens };
    }
};

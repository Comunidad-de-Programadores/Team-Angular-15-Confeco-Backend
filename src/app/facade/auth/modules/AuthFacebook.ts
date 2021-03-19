// Imports modules.
import axios from "axios";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";

// Imports helpers.
import { LoginFacebook } from "../helpers/LoginFacebook";
import { RegisterFacebook } from "../helpers/RegisterFacebook";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { GetUserByEmail } from "../../../repositories/user/read.user";

export class AuthFacebook implements IAuth<IAuthRes> {
    private database: DatabaseRepository<UserDatabase>;

    constructor(private token: string) {
        this.database = new DatabaseRepository;
    }

    async auth(): Promise<IAuthRes> {
        // Send request data facebook
        const res = await axios.get(`https://graph.facebook.com/2830663003869652?fields=email,last_name&access_token=${ this.token }`);
        
        // Consult database.
        const user: UserDatabase | null = await this.database.get(new GetUserByEmail(res.data.email));

        if (!user) {
            const action = new RegisterFacebook(res.data);
            return await action.auth();
        }

        return await new LoginFacebook(user).auth();
    }
};

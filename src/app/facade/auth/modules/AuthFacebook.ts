// Imports modules.
import axios from "axios";

// Imports interfaces.
import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports helpers.
import { LoginFacebook } from "../helpers/LoginFacebook";
import { RegisterFacebook } from "../helpers/RegisterFacebook";

export class AuthFacebook implements IAuth<IAuthRes> {
    constructor(
        private repository: IDatabaseUserRepository,
        private token: string
    ) {}

    async auth(): Promise<IAuthRes> {
        const res = await axios.get(`https://graph.facebook.com/2830663003869652?fields=email,last_name&access_token=${ this.token }`);
        
        const user = await this.repository.getByEmail(res.data.email);

        if (!user) {
            const action = new RegisterFacebook(this.repository, res.data);
            return await action.auth();
        }

        return await new LoginFacebook(this.repository, user).auth();
    }
};

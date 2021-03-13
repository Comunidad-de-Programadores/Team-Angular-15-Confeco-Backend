// Imports interfaces.
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { User } from "../../../models/User";
import { IAuth, ICredentials } from "../interfaces/auth.interfaces";

export class EmailChangeRequest implements IAuth<any> {
    constructor(
        private repository: IDatabaseUserRepository,
        private user: User
    ) {}

    async auth() {
        console.log(this.user);
    }
}

// Imports interfaces.
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { IAuth, ICredentials } from "../interfaces/auth.interfaces";

export class EmailChangeRequest implements IAuth<any> {
    constructor(
        private repository: IDatabaseUserRepository,
        private credentials: ICredentials
    ) {}

    async auth() {
        console.log(this.credentials);
    }
}

import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";

export class VerifyEmail implements IAuth<IAuthRes> {
    constructor(
        private repository: IDatabaseUserRepository,
        private token: string
    ) {}

    async auth(): Promise<any> {
        console.log(this.token);
    }
};

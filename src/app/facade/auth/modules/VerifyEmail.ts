import { IAuth, IAuthRes } from "../../../interfaces/auth.interfaces";

export class VerifyEmail implements IAuth<IAuthRes> {
    async auth(): Promise<any> {
        // ...
    }
};

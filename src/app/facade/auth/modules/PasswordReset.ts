// Imports interfaces.
import { IAuth, IPasswordReset } from "../../../interfaces/auth.interfaces";
import { IEncrypt } from "../../../interfaces/encrypt.interface";
import { IPayloadJwt } from "../../../interfaces/jwt.interfaces";
import { IDatabaseUserRepository } from "../../../interfaces/repositories.interfaces";

// Imports facades.
import { PasswordFacade } from "../../password/PasswordFacade";

export class PasswordReset implements IAuth<void> {
    private password: PasswordFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private data: IPasswordReset
    ) {
        this.password = new PasswordFacade();
    }

    async auth(): Promise<void> {
        // Verify token.
        const payload: IPayloadJwt = await this.password.verifyToken(this.data.token);

        // Generate new password.
        const newPassword: string = await this.encrypt.encrypt(this.data.password);

        // The new password is saved.
        await this.repository.updatePassword(payload.email, newPassword);
    }
}
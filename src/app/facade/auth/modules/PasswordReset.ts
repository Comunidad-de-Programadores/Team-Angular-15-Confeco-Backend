// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth, IPasswordReset } from "../interfaces/auth.interfaces";
import { IEncrypt } from "../../../helpers/encryptors/interfaces/encrypt.interface";
import { IPayloadJwt } from "../../../helpers/jsonwebtokens/interfaces/jwt.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

export class PasswordReset implements IAuth<void> {
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private data: IPasswordReset
    ) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<void> {
        // Verify token.
        const payload: IPayloadJwt = this.jwt.checkPasswordResetToken(this.data.token);

        // Check if the token exists.
        const user = await this.repository.get(payload._id);
        if (!user?.passwordResetToken) throw createHttpError(403, "El token ya ha sido utilizado.");

        // Generate new password.
        const newPassword: string = await this.encrypt.encrypt(this.data.password);

        // The new password is saved.
        Promise.all([
            await this.repository.updatePassword(payload.email, newPassword),
            await this.repository.updatePasswordResetToken(payload._id, undefined)
        ]);
    }
}
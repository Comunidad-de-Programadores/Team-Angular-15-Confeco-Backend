// Imports modules.
import createHttpError from "http-errors";

// Imports interfaces.
import { IAuth, IAuthRes } from "../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

export class VerifyEmail implements IAuth<IAuthRes> {
    private jwt: JwtFacade;

    constructor(
        private repository: IDatabaseUserRepository,
        private token: string
    ) {
        this.jwt = new JwtFacade();
    }

    async auth(): Promise<IAuthRes> {
        // Verify email.
        const res = this.jwt.checkEmailVerificationLink(this.token);

        // Check status account.
        const result = await this.repository.get(res._id);
        if (result?.verified_email) throw createHttpError(403, "Tu cuenta ya esta verificada.");

        // Update status user.
        await this.repository.updateStatusEmail(res._id, true);

        // Get fields user.
        const user = await this.repository.get(res._id);

        if (!user || !user.verified_email) throw createHttpError(403, "Ha ocurrido un error durante la operacion", {
            name: "ErrorExecution"
        });

        // Generate tokens.
        const tokens = this.jwt.generateTokens({ ...user });

        return { user, tokens };
    }
};

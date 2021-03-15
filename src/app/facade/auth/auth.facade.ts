// Imports authentications methods.
import { AuthGoogle } from "./modules/AuthGoogle";
import { VerifyEmail } from "./modules/VerifyEmail";
import { AuthFacebook } from "./modules/AuthFacebook";
import { PasswordReset } from "./modules/PasswordReset";
import { ForgotPassword } from "./modules/ForgotPassword";
import { LoginEmailAndPassword } from "./modules/LoginEmailAndPassword";
import { VerifyPasswordResetToken } from "./modules/VerifyPasswordResetToken";
import { RegisterEmailAndPassword } from "./modules/RegisterEmailAndPassword";

// Imports interfaces
import { IDatabaseUserRepository } from "../../database/interfaces/repositories.interfaces";
import { IAuth, IAuthRes, ICredentials, IEmailVerificacionToken, IPasswordReset, IRegisterParams } from "./interfaces/auth.interfaces";
import { IEncrypt } from "../../helpers/encryptors/interfaces/encrypt.interface";

// Imports repositories.
import { UserRepositoryMongo } from "../../database/mongo/repositories/UserRepositoryMongo";

// Imports encrypt password.
import { BcryptPassword } from "../../helpers/encryptors/BcryptPassword";
import { EmailChangeRequest } from "./modules/EmailChangeRequest";
import { User } from "../../models/User";
import { VerifyEmailChangeToken } from "./modules/VerifyEmailChangeToken";
import { EmailReset } from "./modules/EmailReset";

export class AuthFacade {
    private repository: IDatabaseUserRepository;
    private encrypt: IEncrypt;

    constructor() {
        this.repository = new UserRepositoryMongo();
        this.encrypt = new BcryptPassword();
    }

    async register(data: IRegisterParams): Promise<IEmailVerificacionToken> {
        const register = new RegisterEmailAndPassword(this.encrypt, data);
        return await this.execute(register);
    }

    async login(credentials: ICredentials): Promise<IAuthRes> {
        const login = new LoginEmailAndPassword(credentials);
        return await this.execute(login);
    }

    async verifyEmail(token: string): Promise<IAuthRes> {
        const verify = new VerifyEmail(this.repository, token);
        return await this.execute(verify);
    }

    async forgotPassword(email: string): Promise<void> {
        const action = new ForgotPassword(this.encrypt, email);
        return await this.execute(action);
    }

    async checkValidityToken(token: string): Promise<void> {
        const action = new VerifyPasswordResetToken(this.repository, token);
        return await this.execute(action);
    }

    async resetPassword(data: IPasswordReset): Promise<void> {
        const action = new PasswordReset(this.repository, this.encrypt, data);
        await this.execute(action);
    }

    async google(token: string): Promise<IAuthRes> {
        const google = new AuthGoogle(token);
        return await this.execute(google);
    }

    async facebook(token: string): Promise<IAuthRes> {
        const facebook = new AuthFacebook(token);
        return await this.execute(facebook);
    }

    async emailChangeRequest(user: User) {
        return await this.execute(new EmailChangeRequest(user));
    }

    async checkEmailResetToken(token: string): Promise<void> {
        const action = new VerifyEmailChangeToken(this.repository, token);
        await this.execute(action);
    }

    async resetEmail(data: { email: string; token: string }): Promise<void> {
        const action = new EmailReset(this.repository, data);
        await this.execute(action);
    }

    private async execute<Tval>(strategy: IAuth<Tval>) {
        return await strategy.auth();
    }
};

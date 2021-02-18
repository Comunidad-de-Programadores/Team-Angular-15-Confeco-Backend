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
import { IDatabasePasswordResetRepository, IDatabaseUserRepository } from "../../database/interfaces/repositories.interfaces";
import { IAuth, IAuthRes, ICredentials, IEmailVerificacionToken, IPasswordReset, IRegisterParams } from "../../interfaces/auth.interfaces";
import { IEncrypt } from "../../interfaces/encrypt.interface";

// Imports repositories.
import { UserRepositoryMongo } from "../../database/mongo/repositories/UserRepositoryMongo";
import { PasswordResetsRepositoryMongo } from "../../database/mongo/repositories/PasswordResetsRepositoryMongo";

// Imports encrypt password.
import { BcryptPassword } from "../../helpers/BcryptPassword";

export class AuthFacade {
    private repository: IDatabaseUserRepository;
    private pwdRepository: IDatabasePasswordResetRepository;
    private encrypt: IEncrypt;

    constructor() {
        this.repository = new UserRepositoryMongo();
        this.pwdRepository = new PasswordResetsRepositoryMongo();
        this.encrypt = new BcryptPassword();
    }

    async register(data: IRegisterParams): Promise<IEmailVerificacionToken> {
        const register = new RegisterEmailAndPassword(this.repository, this.encrypt, data);
        return await this.execute(register);
    }

    async login(credentials: ICredentials): Promise<IAuthRes> {
        const login = new LoginEmailAndPassword(this.repository, this.encrypt, credentials);
        return await this.execute(login);
    }

    async verifyEmail(token: string): Promise<IAuthRes> {
        const verify = new VerifyEmail(this.repository, token);
        return await this.execute(verify);
    }

    async forgotPassword(email: string): Promise<void> {
        const action = new ForgotPassword(this.repository, email);
        return await this.execute(action);
    }

    async checkValidityToken(token: string): Promise<void> {
        const action = new VerifyPasswordResetToken(this.pwdRepository, token);
        return await this.execute(action);
    }

    async resetPassword(data: IPasswordReset): Promise<void> {
        const action = new PasswordReset(this.repository, this.encrypt, data);
        return await this.execute(action);
    }

    async google(token: string): Promise<IAuthRes> {
        const google = new AuthGoogle(this.repository, token);
        return await this.execute(google);
    }

    async facebook(token: string): Promise<IAuthRes> {
        const facebook = new AuthFacebook(this.repository, token);
        return await this.execute(facebook);
    }

    private async execute<Tval>(strategy: IAuth<Tval>) {
        return await strategy.auth();
    }
};

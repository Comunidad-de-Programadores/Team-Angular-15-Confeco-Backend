// Imports interfaces.
import { IEncrypt } from "../../interfaces/encrypt.interface";
import { IDatabasePasswordResetRepository } from "../../interfaces/repositories.interfaces";
import { IPayloadJwt } from "../../interfaces/jwt.interfaces";

// Imports repositories.
import { PasswordResetsRepositoryMongo } from "../../database/mongo/repositories/PasswordResetsRepositoryMongo";

// Imports encrypts
import { BcryptPassword } from "../../helpers/BcryptPassword";
import { GeneratePasswordResetToken } from "./modules/GeneratePasswordResetToken";
import { CheckPasswordResetToken } from "./modules/CheckPasswordResetToken";

export class PasswordFacade {
    private repository: IDatabasePasswordResetRepository;
    private encrypt: IEncrypt;

    constructor() {
        this.repository = new PasswordResetsRepositoryMongo();
        this.encrypt = new BcryptPassword();
    }

    async generatePasswordResetToken(email: string): Promise<string> {
        const action = new GeneratePasswordResetToken(this.repository, this.encrypt);
        return await action.generate(email);
    }

    async verifyToken(token: string): Promise<IPayloadJwt> {
        const password = new CheckPasswordResetToken(this.repository, this.encrypt);
        return await password.verify(token);
    }
};

// Imports authentications methods.
import { RegisterEmailAndPassword } from "./modules/RegisterEmailAndPassword";

// Imports interfaces
import { IDatabaseUserRepository } from "../../interfaces/repositories.interfaces";
import { IAuthRes, IRegisterParams } from "../../interfaces/auth.interfaces";
import { IEncrypt } from "../../interfaces/encrypt.interface";

// Imports repositories.
import { UserRepositoryMongo } from "../../database/mongo/repositories/UserRepositoryMongo";

// Imports encrypt password.
import { BcryptPassword } from "../../helpers/BcryptPassword";

export class AuthFacade {
    private repository: IDatabaseUserRepository;
    private encrypt: IEncrypt;

    constructor() {
        this.repository = new UserRepositoryMongo();
        this.encrypt = new BcryptPassword();
    }

    async register(data: IRegisterParams): Promise<IAuthRes> {
        const register = new RegisterEmailAndPassword(this.repository, this.encrypt, data);
        return await register.auth();
    }
};

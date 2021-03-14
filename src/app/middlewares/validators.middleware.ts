// Import modules.
import { Request, Response, NextFunction } from "express";

// Imports interfaces.
import { IDatabaseUserRepository } from "../database/interfaces/repositories.interfaces";
import { IEncrypt } from "../helpers/encryptors/interfaces/encrypt.interface";
import { IUserDatabase } from "../database/interfaces/entities.interfaces";

// Imports encryptors
import { BcryptPassword } from "../helpers/encryptors/BcryptPassword";
const encryptor: IEncrypt = new BcryptPassword;

// Imports repositories.
import { UserRepositoryMongo } from "../database/mongo/repositories/UserRepositoryMongo";
const userRepo: IDatabaseUserRepository = new UserRepositoryMongo;

export class ValidatorsMiddleware {
    async verifyCredentials(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<any> | undefined> {
        // Consult database.
        const user: IUserDatabase | null = await userRepo.getByEmail(req.body.email);

        // Verify email.
        if (!user) return res.status(401).json({
            name: "EmailDoesNotExist",
            message: "El usuario no existe."
        });

        if (!user.verified_email) return res.status(401).json({
            name: "UnconfirmedEmail",
            message: "Necesitas verificar tu email para que puedas acceder."
        });

        // Verify password.
        const result: boolean = await encryptor.compare(req.body.password, user.password);
        result ? next() : res.status(401).json({
            name: "IncorrectPassword",
            message: "La contraseña es incorrecta."
        });
    }
};

// Import modules.
import { Request, Response, NextFunction } from "express";

// Imports interfaces.
import { IEncrypt } from "../helpers/encryptors/interfaces/encrypt.interface";
import { UserDatabase } from "../repositories/interfaces/entities.interfaces";

// Imports encryptors
import { BcryptPassword } from "../helpers/encryptors/BcryptPassword";
const encryptor: IEncrypt = new BcryptPassword;

// Imports repositories.
import { DatabaseRepository } from "../repositories/DatabaseRepository";
import { GetUserByEmail } from "../repositories/user/read.user";

const database = new DatabaseRepository<UserDatabase>();

export class ValidatorsMiddleware {
    async verifyCredentials(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<any> | undefined> {
        // Consult database.
        const { email } = req.body;
        const user: UserDatabase | null = await database.get(new GetUserByEmail(email));

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

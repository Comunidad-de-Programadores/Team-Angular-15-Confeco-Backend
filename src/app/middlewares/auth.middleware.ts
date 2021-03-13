// Imports modules.
import { Request, Response, NextFunction } from "express";

// Imports interfaces.
import { IDatabaseUserRepository } from "../database/interfaces/repositories.interfaces";
import { IEncrypt } from "../helpers/encryptors/interfaces/encrypt.interface";

// Imports models.
import { User } from "../models/User";

// Imports jsonwebtokens.
import { JsonWebToken } from "../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../helpers/jsonwebtokens/strategies/AccessToken";
const jwt: JsonWebToken = new JsonWebToken;

// Imports repositories
import { UserRepositoryMongo } from "../database/mongo/repositories/UserRepositoryMongo";
const repository: IDatabaseUserRepository = new UserRepositoryMongo;

// Imports encryptors.
import { BcryptPassword } from "../helpers/encryptors/BcryptPassword";
import { IUserDatabase } from "../database/interfaces/entities.interfaces";
const encrypt: IEncrypt = new BcryptPassword;

export class AuthMiddleware {
    isAuth(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;
        
        if (!authorization) return res.status(401).json({
            name: "Unauthorized",
            message: "Necesitas access_token para realizar esta accion."
        });

        const data = authorization.includes("Bearer ");
        if (!data) return res.status(401).json({
            name: "Unauthorized",
            message: "La authorizacion debe lucir asi Bearer <access_token>"
        });

        try {
            const token: string = authorization.replace("Bearer ", "");
            const payload: User = jwt.verify(token, new JwtAccessToken);
            req.app.locals.user = payload;
            next();
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async verifyCredentials(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        const user: IUserDatabase | null = await repository.getByEmail(email);
        if (!user) return res.status(404).json({
            name: "Unauthorized",
            message: "El usuario no existe."
        });

        const result: boolean = await encrypt.compare(password, user.password);
        result ? next() : res.status(401).json({
            name: "Unauthorized",
            message: "La contraseña es incorrecta."
        });
    }
};

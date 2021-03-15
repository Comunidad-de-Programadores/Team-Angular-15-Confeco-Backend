// Imports modules.
import { Request, Response, NextFunction } from "express";

// Imports models.
import { User } from "../models/User";

// Imports jsonwebtokens.
import { JsonWebToken } from "../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../helpers/jsonwebtokens/strategies/AccessToken";
const jwt: JsonWebToken = new JsonWebToken;

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
};

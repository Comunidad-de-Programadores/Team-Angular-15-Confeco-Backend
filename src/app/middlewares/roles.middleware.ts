// Imports modules.
import { Request, Response, NextFunction } from "express";

// Imports models.
import { User } from "../models/User";

// Import jsonwebtokens
import { JsonWebToken } from "../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../helpers/jsonwebtokens/strategies/AccessToken";
const jwt: JsonWebToken = new JsonWebToken;

export class RolesMiddleware {
    isOwner(req: Request, res: Response, next: NextFunction) {
        // We obtain the user's information.
        const { id } = req.params;
        const authorizacion = req.headers.authorization as string;
        const token: string = authorizacion.replace("Bearer ", "");
        const payload: User = jwt.verify(token, new JwtAccessToken);
        res.json({ user: payload, result: payload._id === id });
    }
};

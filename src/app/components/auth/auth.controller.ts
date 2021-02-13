// Imports modules.
import { Request, Response } from "express";

// Imports interfaces.
import { IAuthRes } from "../../interfaces/auth.interfaces";

// Imports postman
import { AuthPostmanComponent } from "./auth.postman";
const authPostman = new AuthPostmanComponent();

export class AuthControllerComponents {
    /**
     * Controller responsible for registering the user.
     * @param req 
     * @param res 
     */
    async register(req: Request, res: Response): Promise<void> {
        try {
            const data: IAuthRes = await authPostman.register(req);
            res.status(200).json(data);
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode).json({ name, message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        res.json({ message: "Login from controller" });
    }

    async google(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: "Auth wit google" });
    }
}
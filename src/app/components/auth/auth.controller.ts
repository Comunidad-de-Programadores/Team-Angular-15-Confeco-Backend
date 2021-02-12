// Imports modules.
import { Request, Response } from "express";

// Imports auth facade.
import { AuthFacade } from "../../facade/auth/auth.facade";
const auth = new AuthFacade();

export class AuthControllerComponents {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const data = await auth.register(req.body);
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
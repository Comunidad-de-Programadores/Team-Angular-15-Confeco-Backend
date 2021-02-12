// Imports modules.
import { Request, Response } from "express";

// Imports postman
import { AuthPostmanComponent } from "./auth.postman";
const authPostman = new AuthPostmanComponent();

export class AuthControllerComponents {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const data = await authPostman.register(req);
            res.status(200).json(data);
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode).json({ name, message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        res.json({ message: "Login from controller" });
    }
    
    async verify_email(req: Request, res: Response): Promise<void> {
        try {
            const data = await authPostman.verifyEmail(req);
            res.status(200).json(data);
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode).json({ name, message });
        }
    }

    async google(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: "Auth wit google" });
    }
}
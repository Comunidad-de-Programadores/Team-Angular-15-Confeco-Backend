// Imports modules.
import { Request, Response } from "express";

export class AuthControllerComponents {
    async register(req: Request, res: Response): Promise<void> {
        res.json({ message: "Register from controller" });
    }

    async login(req: Request, res: Response): Promise<void> {
        res.json({ message: "Login from controller" });
    }

    async google(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: "Auth wit google" });
    }
}
import { Request, Response } from "express";

export class AuthControllerComponents {
    register(req: Request, res: Response): void {
        res.json({ message: "Register from controller" });
    }

    login(req: Request, res: Response): void {
        res.json({ message: "Login from controller" });
    }
}
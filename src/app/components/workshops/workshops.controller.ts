// Imports modules.
import { Request, Response } from "express";

export class WorkshopsControllerComponent {
    async list(req: Request, res: Response): Promise<void> {
        res.status(200).json({ message: "Hello Im workshops" });
    }
};

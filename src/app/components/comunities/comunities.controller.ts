// Imports modules.
import { Request, Response } from "express";

export class ComunitiesController {
    async create(req: Request, res: Response): Promise<void> {
        res.status(200).json({
            message: "Crear una comunidad."
        });
    }
}

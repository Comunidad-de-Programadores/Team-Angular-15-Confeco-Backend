// Imports modules.
import { Request, Response } from "express";

export class GroupsController {
    async list(req: Request, res: Response): Promise<Response<string, Record<string, any>> | void> {
        try {
            res.status(200).json({ message: "Obtener grupos" });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

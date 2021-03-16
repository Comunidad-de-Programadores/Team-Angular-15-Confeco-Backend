// Imports modules.
import { Request, Response } from "express";

export class ContentCreatorsController {
    async get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
        try {
            res.status(200).json({
                message: "Obtener creadores de contenido."
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}
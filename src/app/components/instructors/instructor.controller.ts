// Imports modules.
import { Request, Response } from "express";

// Import postman
import { InstructorPostman } from "./instructor.postman";
const postman = new InstructorPostman;

export class InstructorController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const instructor = await postman.create(req);
            res.status(200).json({ instructor });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const items = await postman.get(req);
            res.status(200).json({ items });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
};

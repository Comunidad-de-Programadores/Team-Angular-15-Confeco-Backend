// Imports modules.
import { Request, Response } from "express";
import { Badge } from "../../models/badges/Badge";

// Imports postman
import { BadgesPostman } from "./badges.postman";
const postman: BadgesPostman = new BadgesPostman;

export class BadgesController {
    async get(req: Request, res: Response): Promise<Response<string, Record<string, any>> | void> {
        try {
            const data: Badge | Badge[] = await postman.get(req);
            if (Array.isArray(data)) return res.status(200).json({ badges: data });
            res.status(200).json(data);
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

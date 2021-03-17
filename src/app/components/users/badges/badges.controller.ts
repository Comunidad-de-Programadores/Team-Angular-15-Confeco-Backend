// Imports modules.
import { Request, Response } from "express";

// Imports modules.
import { BadgeUser } from "../../../models/badges/BadgeUser";
import { GetBadgesByUserId } from "../../../repositories/badges/write.badge";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
const database = new DatabaseRepository<string, BadgeUser>();

export class BadgesUsersController {
    async list(req: Request, res: Response) {
        try {
            const badges: BadgeUser[] = await database.list(new GetBadgesByUserId(req.params.userId));
            res.status(200).json({ badges });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

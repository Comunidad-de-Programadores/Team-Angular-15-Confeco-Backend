// Imports modules.
import { Request, Response } from "express";

// Imports models.
import { Badge } from "../../../models/badges/Badge";
import { BadgeUser } from "../../../models/badges/BadgeUser";

// Imports modules.
import { GetBadgesByUserId } from "../../../repositories/badges/read.badges";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
const database = new DatabaseRepository<string, BadgeUser>();

export class BadgesUsersController {
    async list(req: Request, res: Response) {
        try {
            const badges: BadgeUser[] = await database.list(new GetBadgesByUserId(req.params.userId));
            const items: Badge[] = badges.map(badge => (badge.badgeId as Badge));
            res.status(200).json({ badges: items });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";

// Imports models.
import { Badge } from "../../models/badges/Badge";

// Imports repositories.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";

// Import repository actions.
import { GetBadge, ListBadges } from "../../repositories/badges/read.badges";

export class BadgesPostman {
    private database: DatabaseRepository<Badge>;

    constructor() {
        this.database = new DatabaseRepository;
    }

    async get(req: Request): Promise<Badge | Badge[]> {
        const { badgeId } = req.params;

        if (badgeId) {
            const badge: Badge | null = await this.database.get(new GetBadge(badgeId));
            if (!badge) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "ResourceNotFound"
            });
            
            return badge;
        }

        return await this.database.list(new ListBadges);
    }
}
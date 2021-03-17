// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";

// Imports models.
import { Badge } from "../../models/badges/Badge";

// Imports repositories.
import { GetBadge, ListBadges } from "../../repositories/badges/read.badges";
import { DatabaseRepository } from "../../repositories/DatabaseRepository";

export class BadgesPostman {
    private database: DatabaseRepository<string, Badge>;

    constructor() {
        this.database = new DatabaseRepository;
    }

    async get(req: Request): Promise<Badge | Badge[]> {
        const { badgeId } = req.params;
        if (badgeId) {
            const badge: Badge | null = await this.database.get(badgeId, new GetBadge);
            if (!badge) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "ResourceNotFound"
            });
            
            return badge;
        }

        return await this.database.list(new ListBadges);
    }
}
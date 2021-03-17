// Imports database models.
import { models } from "../../database/mongo/index";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models
import { Badge } from "../../models/badges/Badge";

export class GetBadge implements Get<string, Badge> {
    async get(badgeId: string): Promise<Badge | null> {
        return await models.Badge.findById(badgeId) as any;
    }
}

export class ListBadges implements List<Badge> {
    async list(): Promise<Badge[]> {
        return await models.Badge.find() as any[];
    }
}
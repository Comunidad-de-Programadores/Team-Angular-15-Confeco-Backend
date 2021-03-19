// Imports database models.
import { models } from "../../database/mongo/index";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models
import { Badge } from "../../models/badges/Badge";
import { BadgeUser } from "../../models/badges/BadgeUser";

export class GetBadge implements Get<Badge> {
    constructor(private badgeId: string) {}

    async get(): Promise<Badge | null> {
        return await models.Badge.findById(this.badgeId) as any;
    }
}

export class ListBadges implements List<Badge> {
    async list(): Promise<Badge[]> {
        return await models.Badge.find() as any[];
    }
}

export class GetBadgesByUserId implements List<BadgeUser> {
    constructor(private userId: string) {}

    async list(): Promise<BadgeUser[]> {
        return await models.BadgeUser.find({ userId: this.userId }) as any[];
    }
}

export class GetBadgeByIdAndUserId implements Get<BadgeUser> {
    constructor(private data: { badgeId: string; userId: string }) {}

    async get(): Promise<BadgeUser | null> {
        const { badgeId, userId } = this.data;
        return await models.BadgeUser.findOne({ badgeId, userId }) as any;
    }
}

// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Create, List } from "../interfaces/repository.interfaces";

// Imports models.
import { Badge } from "../../models/badges/Badge";
import { BadgeUser } from "../../models/badges/BadgeUser";

export class CreateBadge implements Create<Badge> {
    async create(entity: Badge): Promise<void> {
        await models.Badge.create(entity);
    }
}

export class WinBadge implements Create<BadgeUser> {
    async create(entity: BadgeUser): Promise<void> {
        await models.BadgeUser.create(entity);
    }
}

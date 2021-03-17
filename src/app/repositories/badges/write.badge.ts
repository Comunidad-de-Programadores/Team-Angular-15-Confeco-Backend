// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Create } from "../interfaces/repository.interfaces";

// Imports models.
import { Badge } from "../../models/badges/Badge";

export class CreateBadge implements Create<Badge> {
    async create(entity: Badge): Promise<void> {
        await models.Badge.create(entity);
    }
}

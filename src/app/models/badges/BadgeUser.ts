import { Badge } from "./Badge";

export class BadgeUser {
    _id: string;
    userId: string;
    badgeId: string | Badge;
    created_at?: Date;

    constructor(entity: BadgeUser) {
        this._id = entity._id;
        this.userId = entity.userId;
        this.badgeId = entity.badgeId;
        this.created_at = entity.created_at;
    }
}

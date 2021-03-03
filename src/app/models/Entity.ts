// Imports models.
import { Timestamp } from "./Timestamp";
import { User } from "./User";

export class Entity extends Timestamp {
    _id: string;
    title: string;
    subtitle?: string;
    description?: string;
    logo?: string;
    users?: string[] | User[];
    ownerId: string;

    constructor(entity: Entity) {
        super();
        this._id = entity._id;
        this.ownerId = entity.ownerId;
        this.title = entity.title;
        this.subtitle = entity.subtitle;
        this.description = entity.description;
        this.logo = entity.logo;
        this.users = entity.users;
        this.created_at = entity.created_at;
        this.updated_at = entity.updated_at;
    }
};

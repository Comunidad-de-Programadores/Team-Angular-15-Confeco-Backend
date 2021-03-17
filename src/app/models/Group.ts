import { Timestamp } from "./Timestamp";
import { User } from "./User";

export class Group extends Timestamp {
    _id: string;
    banner: string;
    name: string;
    members?: string[] | User[];
    tag: { text: string; color: string };
    description?: string;

    constructor(entity: Group) {
        super();
        this._id = entity._id;
        this.banner = entity.banner;
        this.name = entity.name;
        this.members = entity.members;
        this.tag = entity.tag;
    }
}

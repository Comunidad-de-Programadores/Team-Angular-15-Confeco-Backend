import { Timestamp } from "./Timestamp";

export class ContentCreator extends Timestamp {
    _id: string;
    name: string;
    profession?: string;
    avatar?: string;
    socialMedia: string;

    constructor(entity: ContentCreator) {
        super();
        this._id = entity._id;
        this.name = entity.name;
        this.profession = entity.profession;
        this.avatar = entity.avatar;
        this.socialMedia = entity.socialMedia;
    }
}
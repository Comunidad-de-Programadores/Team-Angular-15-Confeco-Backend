import { Timestamp } from "./Timestamp"

export class Community extends Timestamp {
    _id: string;
    title: string;
    description?: string;
    url: string;
    banner?: string;

    constructor(community: Community) {
        super();
        this._id = community._id;
        this.title = community.title;
        this.url = community.url;
        this.description = community.description;
        this.banner = community.banner;
    }
}
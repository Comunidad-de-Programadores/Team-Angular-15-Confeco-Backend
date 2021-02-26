// Imports models.
import { Workshop } from "./Workshop";

export class KnowledgeArea {
    _id: string;
    title: string;
    subtitle?: string;
    description?: string;
    banner?: string;
    profile_picture?: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data: KnowledgeArea) {
        this._id = data._id;
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.description = data.description;
        this.banner = data.banner;
        this.profile_picture = data.profile_picture;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
};

export class KnowledgeArea {
    _id: string;
    title: string;
    subtitle?: string;
    description?: string;
    banner?: string;
    logo?: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data: KnowledgeArea) {
        this._id = data._id;
        this.title = data.title;
        this.subtitle = data.subtitle;
        this.description = data.description;
        this.banner = data.banner;
        this.logo = data.logo;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
};

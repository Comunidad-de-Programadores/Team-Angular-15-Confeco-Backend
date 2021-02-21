export class Instructor {
    _id: string;
    name: string;
    profession?: string;
    social_media: string;
    picture?: string;
    created_at?: string;
    updated_at?: string;

    constructor(data: Instructor) {
        this._id = data._id;
        this.name = data.name;
        this.profession = data.profession;
        this.social_media = data.social_media;
        this.picture = data.picture;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
};

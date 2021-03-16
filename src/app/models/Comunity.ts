import { Timestamp } from "./Timestamp"

export class Comunity extends Timestamp {
    _id: string;
    title: string;
    description?: string;
    banner?: string;

    constructor(comunity: Comunity) {
        super();
        this._id = comunity._id;
        this.title = comunity.title;
        this.description = comunity.description;
        this.banner = comunity.banner;
    }
}
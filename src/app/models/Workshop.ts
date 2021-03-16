import { KnowledgeArea } from "./KnowledgeArea";
import { Timestamp } from "./Timestamp";
import { User } from "./User";

export class Workshop extends Timestamp {
    _id: string;
    title: string;
    description?: string;
    picture?: string;
    instructor: User | string;
    knowledgeArea: KnowledgeArea | string;
    workshopTime: Date;
    workshopsEndTime: Date;

    constructor(workshop: Workshop) {
        super();
        this._id = workshop._id;
        this.title = workshop.title;
        this.description = workshop.description;
        this.picture = workshop.picture;
        this.instructor = workshop.instructor;
        this.knowledgeArea = workshop.knowledgeArea;
        this.workshopTime = workshop.workshopTime;
        this.workshopsEndTime = workshop.workshopsEndTime;
    }
}

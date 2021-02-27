// Imports models.
import { KnowledgeArea } from "./KnowledgeArea";
import { User } from "./User";

export class Workshop {
    _id: string;
    title: string;
    subtitle: string;
    description?: string;
    workshop_time: Date;
    knowledgeAreas?: string[] | KnowledgeArea[];
    workshop_duration: Date;
    instructor: User | string;
    created_at?: Date;
    updated_at?: Date;

    constructor(workshop: Workshop) {
        this._id = workshop._id;
        this.title = workshop.title;
        this.subtitle = workshop.subtitle;
        this.description = workshop.description;
        this.workshop_time = workshop.workshop_time;
        this.workshop_duration = workshop.workshop_duration;
        this.instructor = workshop.instructor;
        this.knowledgeAreas = workshop.knowledgeAreas;
        this.created_at = workshop.created_at;
        this.updated_at = workshop.updated_at;
    }
};

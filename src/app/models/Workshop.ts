export class Workshop {
    _id: string;
    title: string;
    subtitle: string;
    workshop_time: Date;
    workshop_duration: Date;
    instructor: object;

    constructor(workshop: Workshop) {
        this._id = workshop._id;
        this.title = workshop.title;
        this.subtitle = workshop.subtitle;
        this.workshop_time = workshop.workshop_time;
        this.workshop_duration = workshop.workshop_duration;
        this.instructor = workshop.instructor;
    }
};

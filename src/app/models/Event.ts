// Imports models.
import { Entity } from "./Entity";

export class Event extends Entity {
    expedition_date: Date;
    expiration_date: Date;

    constructor(event: Event) {
        super(event);
        this.expedition_date = event.expedition_date;
        this.expiration_date = event.expiration_date;
    }
};

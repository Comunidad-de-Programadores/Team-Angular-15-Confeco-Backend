// Imports modules.
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports models.
import { Event } from "../../models/Event";

export class EventPostman {
    async create(req: Request) {
        const { user } = req.app.locals;

        const event: Event = new Event({
            _id: uuid(),
            ownerId: user._id,
            title: req.body.title,
            expedition_date: new Date,
            expiration_date: new Date
        });

        console.log(event);
    }
};

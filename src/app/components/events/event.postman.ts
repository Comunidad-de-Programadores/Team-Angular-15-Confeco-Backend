// Imports modules.
import { Request } from "express";
import { v4 as uuid } from "uuid";
import { IEventRepository } from "../../database/interfaces/repositories.interfaces";

// Imports models.
import { Event } from "../../models/Event";

// Imports repositories.
import { EventRepositoryMongo } from "../../database/mongo/repositories/EventRepositoryMongo";
import createHttpError from "http-errors";

export class EventPostman {
    private repository: IEventRepository;

    constructor() {
        this.repository = new EventRepositoryMongo;
    }

    async create(req: Request) {
        const { user } = req.app.locals;

        // Create new schema.
        const id: string = uuid();
        const event: Event = new Event({
            _id: id,
            ownerId: user._id,
            title: req.body.title,
            expedition_date: new Date,
            expiration_date: new Date
        });

        // Save event;
        await this.repository.create(event);

        const data: Event | null = await this.repository.get(id);

        if (!data) throw createHttpError(400, "Sucedio un error en la creacion del recurso", {
            name: "ResourceCreationFailed"
        });

        return data;
    }
};

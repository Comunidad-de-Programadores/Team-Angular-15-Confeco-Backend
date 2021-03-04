// Imports modules.
import { Request } from "express";
import { v4 as uuid } from "uuid";
import createHttpError from "http-errors";

// Imports interfaces.
import { IEventRepository } from "../../database/interfaces/repositories.interfaces";

// Imports models.
import { Event } from "../../models/Event";

// Imports repositories.
import { EventRepositoryMongo } from "../../database/mongo/repositories/EventRepositoryMongo";
import { User } from "../../models/User";

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
            owner: user._id,
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

    async get(req: Request) {
        const { id } = req.params;
        const { limit, skip } = req.query;

        if (id) {
            const event: Event | null = await this.repository.get(id);
            
            if (!event) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "ResourcesNotFound"
            });
            
            return event;
        }

        return await this.repository.list({
            limit: Number(limit),
            skip: Number(skip)
        });
    }

    async remove(req: Request) {
        const { id } = req.params;
        const { user } = req.app.locals;

        const event: Event | null = await this.repository.get(id);

        if (!event) throw createHttpError(404, "El recurso no puede eliminarse porque no existe.", {
            name: "ResourcesDeletionFailed"
        });

        const owner: User = event.owner as User;
        if (owner._id !== user._id) throw createHttpError(401, "No tienes los permisos necesarios para realizar esta accion.", {
            name: "Unauthorized"
        });

        await this.repository.delete(id);

        return { title: event.title };
    }
};

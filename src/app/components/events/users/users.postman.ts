// Imports modules.
import createHttpError from "http-errors";
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IEventRepository, IEventUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { IEventDatabase } from "../../../database/interfaces/entities.interfaces";

// Imports repositories.
import { EventRepositoryMongo } from "../../../database/mongo/repositories/EventRepositoryMongo";
import { EventUserRepositoryMongo } from "../../../database/mongo/repositories/events/EventUserRepositoryMongo";

export class EventUserPostman {
    private eventRepository: IEventRepository;
    private eventUserRepository: IEventUserRepository;

    constructor() {
        this.eventRepository = new EventRepositoryMongo;
        this.eventUserRepository = new EventUserRepositoryMongo;
    }

    async create(req: Request) {
        const { eventId } = req.params;
        const { userId } = req.body;

        // Verify existence event.
        const event: IEventDatabase | null = await this.eventRepository.get(eventId);
        if (!event) throw createHttpError(404, "La operacion fallo porque el evento al que desea registrarse no existe.", {
            name: "ResourceNotFoundFailed"
        });

        // Save new user in the events.
        const id: string = uuid();
        await this.eventUserRepository.create({
            _id: id,
            user: userId,
            eventId: event._id
        });

        const data = await this.eventUserRepository.get(id);
        if (!data) throw createHttpError(400, "Sucedio un error durante el registro del usuario al evento.", {
            name: "Error"
        });
        
        return data;
    }
}

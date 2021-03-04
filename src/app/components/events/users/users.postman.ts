// Imports modules.
import createHttpError from "http-errors";
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IEventRepository, IEventUserRepository } from "../../../database/interfaces/repositories.interfaces";
import { IEventDatabase, IUserDatabase } from "../../../database/interfaces/entities.interfaces";

// Imports repositories.
import { EventRepositoryMongo } from "../../../database/mongo/repositories/EventRepositoryMongo";
import { EventUserRepositoryMongo } from "../../../database/mongo/repositories/events/EventUserRepositoryMongo";
import { User } from "../../../models/User";

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
        const { user } = req.app.locals;

        if (user._id === userId) throw createHttpError(400, "Esta accion no esta permitida.", {
            name: "NotAllowed"
        });

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

    async get(req: Request) {
        const { userId, eventId } = req.params;
        const { limit, skip } = req.query;

        if (userId) {
            const user: IUserDatabase | null = await this.eventUserRepository.getUserByEvent(userId, eventId);
            if (!user) throw createHttpError(404, "El usuario no existe en este evento.", {
                name: "NonExistentUser"
            });
            return user;
        }

        return this.eventUserRepository.getUsersByEvent(eventId, {
            limit: Number(limit),
            skip: Number(skip)
        });
    }

    async remove(req: Request) {
        const { userId, eventId } = req.params;
        const event = await this.eventUserRepository.getUserByEvent(userId, eventId);
        if (!event) throw createHttpError(404, "No puedes eliminar al usuario del evento porque no existe.", {
            name: "ResourcesDeletionFailed"
        });
        
        // Remove user of event.
        await this.eventUserRepository.delete(event._id);

        const user: User = event.user as User;
        return { nickname: user.nickname };
    }
}

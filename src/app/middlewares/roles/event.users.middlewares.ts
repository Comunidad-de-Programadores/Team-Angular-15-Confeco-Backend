// Imports modules.
import { Request, Response, NextFunction } from "express";

// Imports interfaces.
import { EventRepositoryMongo } from "../../database/mongo/repositories/EventRepositoryMongo";
import { IEventUserDatabase } from "../../database/interfaces/entities.interfaces";

// Imports models.
import { Event } from "../../models/Event";
import { User } from "../../models/User";

// Imports repositories
import { EventUserRepositoryMongo } from "../../database/mongo/repositories/events/EventUserRepositoryMongo";
const eventUserRepo: EventUserRepositoryMongo = new EventUserRepositoryMongo;

const eventRepo: EventRepositoryMongo = new EventRepositoryMongo;

export class EventsUserRoles {
    async create(req: Request, res: Response, next: NextFunction) {
        const { user } = req.app.locals;
        const { eventId } = req.params;
        const { userId } = req.body;

        const event: Event | null = await eventRepo.get(eventId);
        if (!event) return res.status(404).json({
            name: "ResourceNotFound",
            message: "No puedes agregar usuarios porque el evento no existe."
        });

        const owner: User = event.owner as User;
        if (owner._id !== user._id) return res.status(401).json({
            name: "Unauthorized",
            message: "Necesitas permisos de administrador para realizar esta accion."
        });

        const data: IEventUserDatabase | null = await eventUserRepo.getUserByEvent(userId, eventId);
        const member: User = data?.user as User;
        !data ? next() : res.status(403).json({
            name: "ResourceCreationFailed",
            message: `${ member.nickname } ya pertenece al evento.`
        });
    }
}

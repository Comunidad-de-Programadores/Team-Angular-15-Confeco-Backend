// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";

// Imports models.
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";

// Imports action repositories.
import { GetEvent, GetEventByIdAndBannedUser, GetEventByIdAndMemberId } from "../../../repositories/events/read.events";
import { AddUserToEvent } from "../../../repositories/events/write.events";
import { GetUser } from "../../../repositories/user/read.user";

export class EventsUsersPostman {
    private databaseEvent: DatabaseRepository<string, Event>;
    private databaseUser: DatabaseRepository<string, User>;

    constructor() {
        this.databaseEvent = new DatabaseRepository;
        this.databaseUser = new DatabaseRepository;
    }

    async create(req: Request): Promise<{ event: string, user: string }> {
        const { eventId } = req.params;
        const { userId } = req.body;

        // Check if the user exists.
        const user: User | null = await this.databaseUser.get(userId, new GetUser);
        if (!user) throw createHttpError(404, "No puedes suscribir al usuario al evento porque no existe.", {
            name: "UserNotFound"
        });

        // Check if the event exists
        const eventResult: Event | null = await this.databaseEvent.get(eventId, new GetEvent);
        if (!eventResult) throw createHttpError(404, "No puedes suscribir al usuario a un evento que no existe.", {
            name: "ResourceNotFound"
        });

        // Check if the user is already participating.
        const event: Event | null = await this.databaseEvent.get(
            eventId,
            new GetEventByIdAndMemberId({ memberId: userId })
        );
        if (event) throw createHttpError(403, `El usuario ${ user.nickname } ya forma parte del evento.`, {
            name: "UserAlreadyEvent"
        });

        // Check if the user is banned.
        const banned: Event | null = await this.databaseEvent.get(
            eventId,
            new GetEventByIdAndBannedUser({ userId })
        );
        if (banned) throw createHttpError(403, "Has sido baneado de eventp", {
            name: "BannedEvent"
        });

        // Add user to event.
        await this.databaseEvent.update(new AddUserToEvent({ eventId, userId }));
        return { event: eventResult.name, user: user.nickname };
    }
}

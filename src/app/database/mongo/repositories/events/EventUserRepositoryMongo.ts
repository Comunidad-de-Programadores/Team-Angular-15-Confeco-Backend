// Imports models.
import { models } from "../../index";

// Imports interfaces.
import { IEventUserDatabase, IUserDatabase } from "../../../interfaces/entities.interfaces";
import { IEventUserRepository, IOptionsList } from "../../../interfaces/repositories.interfaces";

export class EventUserRepositoryMongo implements IEventUserRepository {
    async create(entity: IEventUserDatabase): Promise<void> {
        await models.EventUser.create(entity);
    }

    async get(id: string): Promise<IEventUserDatabase | null> {
        const entity: any = await models.EventUser.findById(id);
        return entity;
    }

    async getUsersByEvent(eventId: string, option: IOptionsList): Promise<IUserDatabase[]> {
        const users: any[] = await models.EventUser
        .find({ eventId: eventId }, { users: 1, _id: 0 })
        .skip(option.skip || 0)
        .limit(option.limit || 15);
        return users;
    }

    async getUserByEvent(userId: string, eventId: string): Promise<IUserDatabase | null> {
        const user: any = await models.EventUser.findOne(
            { $and: [{ eventId }, { user: userId }] },
            { user: 1, _id: 0 }
        );
        return user;
    }

    update(id: string, data: IEventUserDatabase): Promise<void> {
        throw new Error("Method not implemented.");
    }

    list(options: IOptionsList): Promise<IEventUserDatabase[]> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
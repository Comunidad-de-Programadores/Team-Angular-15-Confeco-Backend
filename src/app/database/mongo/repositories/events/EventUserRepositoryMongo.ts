// Imports models.
import { models } from "../../index";

// Imports interfaces.
import { IEventUserDatabase } from "../../../interfaces/entities.interfaces";
import { IEventUserRepository, IOptionsList } from "../../../interfaces/repositories.interfaces";

export class EventUserRepositoryMongo implements IEventUserRepository {
    async create(entity: IEventUserDatabase): Promise<void> {
        await models.EventUser.create(entity);
    }

    async get(id: string): Promise<IEventUserDatabase | null> {
        const entity: any = await models.EventUser.findById(id);
        return entity;
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
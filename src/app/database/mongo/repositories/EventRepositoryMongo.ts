// Imports interfaces.
import { IEventDatabase } from "../../interfaces/entities.interfaces";
import { IEventRepository, IOptionsList } from "../../interfaces/repositories.interfaces";

// Imports models.
import { models } from "../index";

export class EventRepositoryMongo implements IEventRepository {
    async create(entity: IEventDatabase): Promise<void> {
        await models.Event.create(entity);
    }
    
    async get(id: string): Promise<IEventDatabase | null> {
        const data: any = await models.Event.findById(id);
        return data;
    }

    async update(_id: string, data: IEventDatabase): Promise<void> {
        await models.Event.updateOne({ _id }, data);
    }

    async list(options: IOptionsList): Promise<IEventDatabase[]> {
        const items: any[] = await models.Event.find({})
        .skip(options.skip || 0)
        .limit(options.limit || 15)
        .sort({ created_at: -1 });
        return items;
    }

    async delete(_id: string): Promise<void> {
        await models.Event.deleteOne({ _id });
    }
};

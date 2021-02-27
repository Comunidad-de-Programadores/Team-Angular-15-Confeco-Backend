// Imports database models.
import { models } from "../index";

// Imports interfaces.
import { IOptionsList, IWorkshopRepository } from "../../interfaces/repositories.interfaces";

// Imports models.
import { Workshop } from "../../../models/Workshop";

export class WorkshopRepositoryMongo implements IWorkshopRepository {
    async create(data: Workshop): Promise<void> {
        await models.Workshop.create(data);
    }

    async get(id: string): Promise<Workshop | null> {
        const data: any = await models.Workshop.findById(id);
        return data;
    }

    async getByInstructor(user_id: string): Promise<Workshop | null> {
        const data: any = models.Workshop.find({ instructor: user_id });
        return data;
    }

    async list(options: IOptionsList): Promise<Workshop[]> {
        const items: any[] = await models.Workshop
        .find({})
        .skip(options.skip || 0)
        .limit(options.limit || 15)
        .sort({ created_at: -1 });
        return items;
    }

    async update(id: string, data: Workshop): Promise<void> {
        // ...
    }

    async delete(_id: string): Promise<void> {
        await models.Workshop.deleteOne({ _id });
    }
};

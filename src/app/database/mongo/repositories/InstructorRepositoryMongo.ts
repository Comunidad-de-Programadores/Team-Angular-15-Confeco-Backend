// Imports interfaces.
import { models } from "..";
import { Instructor } from "../../../models/Instructor";
import { IInstructorRepository, IOptionsList } from "../../interfaces/repositories.interfaces";

export class InstructorRepositoryMongo implements IInstructorRepository {
    async create(data: Instructor): Promise<void> {
        await models.Instructor.create(data);
    }

    async get(id: string): Promise<Instructor | null> {
        const data: any = await models.Instructor.findById(id);
        return data ? new Instructor(data) : null;
    }

    async list(options: IOptionsList): Promise<Instructor[]> {
        const items: any[] = await models.Instructor
        .find({})
        .limit(options.limit || 15)
        .skip(options.skip || 0)
        .sort({ created_at: -1 });
        return items;
    }

    async update(): Promise<void> {}

    async delete(): Promise<void> {}
};

// Imports interfaces.
import { Instructor } from "../../../models/Instructor";
import { IInstructorRepository } from "../../interfaces/repositories.interfaces";

export class InstructorRepositoryMongo implements IInstructorRepository {
    async create(): Promise<void> {}

    async get(): Promise<Instructor | null> {
        return null;
    }

    async list(): Promise<Instructor[]> {
        return [];
    }

    async update(): Promise<void> {}

    async delete(): Promise<void> {}
};

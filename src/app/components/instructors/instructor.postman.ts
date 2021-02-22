// Imports modules.
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IInstructorRepository } from "../../database/interfaces/repositories.interfaces";

// Imports repositories
import { InstructorRepositoryMongo } from "../../database/mongo/repositories/InstructorRepositoryMongo";

export class InstructorPostman {
    private repository: IInstructorRepository;

    constructor() {
        this.repository = new InstructorRepositoryMongo;
    }

    async create(req: Request) {
        // Save user.
        const _id: string = uuid();
        await this.repository.create({ _id, ...req.body });

        // Get new user.
        return await this.repository.get(_id);
    }

    async get(req: Request) {
        const { id } = req.params;
        if (id) return await this.repository.get(id);

        const { limit, skip } = req.query;
        return await this.repository.list({
            limit: Number(limit),
            skip: Number(skip)
        });
    }
};

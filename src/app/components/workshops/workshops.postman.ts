// Imports repositories.
import { Request } from "express";
import createHttpError from "http-errors";

// Imports models.
import { Workshop } from "../../models/Workshop";

// Imports repositories.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";
import { GetWorkshop, ListWorkshop } from "../../repositories/workshops/read.workshops";

export class WorkshopsPostman {
    private database: DatabaseRepository<string, Workshop>;

    constructor() {
        this.database = new DatabaseRepository;
    }

    async get(req: Request): Promise<Workshop | Workshop[]> {
        const { workshopId } = req.params;

        if (workshopId) {
            const workshop: Workshop | null = await this.database.get(workshopId, new GetWorkshop);

            if (!workshop) throw createHttpError(404, "El recurso solicitado no existe", {
                name: "ResourceNotFound"
            });

            return workshop;
        }

        return await this.database.list(new ListWorkshop);
    }
}

// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";
import { IWorkshopDatabase } from "../../../database/interfaces/entities.interfaces";

// Imports interfaces.
import { IWorkshopRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports repositories.
import { WorkshopRepositoryMongo } from "../../../database/mongo/repositories/WorkshopRepositoryMongo";

export class UserWorkshopPostman {
    private repository: IWorkshopRepository;
    
    constructor() {
        this.repository = new WorkshopRepositoryMongo;
    }
    
    async list(req: Request): Promise<IWorkshopDatabase | IWorkshopDatabase[]> {
        const { userId, workshopId } = req.params;
        if (workshopId) {
            const workshop = await this.repository.getByInstructorAndId(userId, workshopId);

            if (!workshop) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "NotFound"
            });

            return workshop;
        }

        return await this.repository.getByInstructor(userId);
    }
};

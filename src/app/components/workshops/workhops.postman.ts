// Imports modules.
import createHttpError from "http-errors";
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IWorkshopRepository } from "../../database/interfaces/repositories.interfaces";

// Imports models.
import { User } from "../../models/User";
import { Workshop } from "../../models/Workshop";

// Imports repositories.
import { WorkshopRepositoryMongo } from "../../database/mongo/repositories/WorkshopRepositoryMongo";

export class WorkshopPostman {
    private repository: IWorkshopRepository;

    constructor() {
        this.repository = new WorkshopRepositoryMongo;
    }

    async create(req: Request) {
        // Save in the database.
        const _id = uuid();

        // We obtain the user's information.
        const payload: User = req.app.locals.user;
        const instructor: string = payload._id;

        // Save user in the database.
        await this.repository.create({ _id, instructor, ...req.body });

        // Get data.
        return await this.repository.get(_id);
    }

    async list(req: Request) {
        // Get one.
        if (req.params.id) {
            const workshop = await this.repository.get(req.params.id);
            
            if (!workshop) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "NotFount"
            });

            return workshop;
        }

        // Get list
        const { limit, skip } = req.query;
        return await this.repository.list({
            limit: Number(limit),
            skip: Number(skip)
        });
    }

    async update(req: Request) {
        const payload: User = req.app.locals.user;

        // Get workshop.
        const workshop: Workshop | null = await this.repository.get(req.params.id);
        if (!workshop) throw createHttpError(404, "No puedes editar este recurso por que no existe.", {
            name: "NotFound"
        });

        const instructor = workshop.instructor as User;
        if (instructor._id !== payload._id) throw createHttpError(401, "No tienes los permisos necesarios para realizar esta accion.", {
            name: "Unauthorized"
        });

        // Update workshop.
        const newWorkshop = new Workshop({
            _id: workshop._id,
            title: req.body.title || workshop.title,
            subtitle: req.body.subtitle || workshop.subtitle,
            description: req.body.description || workshop.description,
            instructor: payload._id,
            knowledgeAreas: req.body.knowledgeAreas || workshop.knowledgeAreas,
            workshop_time: req.body.workshop_time || workshop.workshop_time,
            workshop_duration: req.body.workshop_duration || workshop.workshop_duration,
            created_at: workshop.created_at,
            updated_at: new Date
        });

        // Update workshop.
        await this.repository.update(req.params.id, newWorkshop);
        return { title: workshop.title };
    }

    async remove(req: Request): Promise<{ title: string }> {
        const payload: User = req.app.locals.user;

        // Get workshop
        const workshop: Workshop | null = await this.repository.get(req.params.id);
        if (!workshop) throw createHttpError(404, "El recurso no puede ser eliminado por que no existe.", {
            name: "NotFound"
        });

        const instructor = workshop.instructor as User;
        if (instructor._id !== payload._id) throw createHttpError(401, "No tienes los permisos necesarios para realizar esta accion", {
            name: "Unauthorized"
        });

        // Delete workshop.
        await this.repository.delete(req.params.id);
        return { title: workshop.title };
    }
};

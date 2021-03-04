// Imports modules.
import { Request, Response } from "express";

// Imports event postman
import { EventPostman } from "./event.postman";
const postman: EventPostman = new EventPostman;

export class EventsController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const event = await postman.create(req);
            res.status(200).json({
                message: `El evento ${ event?.title } se ha creado con exito.`,
                event
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        try {
            const events = await postman.get(req);
            res.status(200).json({ events });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async remove(req: Request, res: Response): Promise<void> {
        try {
            const data = await postman.remove(req);
            res.status(200).json({ message: `El evento ${ data.title } se ha eliminado con exito.` });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

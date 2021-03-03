// Imports modules.
import { Request, Response } from "express";

// Imports event postman
import { EventPostman } from "./event.postman";
const postman: EventPostman = new EventPostman;

export class EventsController {
    async create(req: Request, res: Response): Promise<void> {
        const event = await postman.create(req);
        res.status(200).json({
            message: `El evento ${ event?.title } se ha creado con exito.`,
            event
        });
    }
}

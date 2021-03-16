// Imports modules.
import { Request, Response } from "express";
import { Workshop } from "../../models/Workshop";

// Imports postman.
import { WorkshopsPostman } from "./workshops.postman";
const postman: WorkshopsPostman = new WorkshopsPostman;

export class WorkshopsController {
    async get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
        try {
            const data: Workshop | Workshop[] = await postman.get(req);

            if (Array.isArray(data)) return res.status(200).json({
                workshops: data
            });

            res.status(200).json({ workshop: data });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}
// Imports modules.
import { Request, Response } from "express";
import { ContentCreator } from "../../models/ContentCreator";

// Import postman.
import { ContentCreatorsPostman } from "./contentCreators.postman";
const postman = new ContentCreatorsPostman;

export class ContentCreatorsController {
    async get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
        try {
            const data: ContentCreator | ContentCreator[] = await postman.get(req);
            
            if (Array.isArray(data)) return res.status(200).json({
                contentCreators: data
            });
            
            res.status(200).json({ contentCreator: data });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}
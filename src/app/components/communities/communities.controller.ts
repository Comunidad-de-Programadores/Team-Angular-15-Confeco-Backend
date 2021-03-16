// Imports modules.
import { Request, Response } from "express";
import { Community } from "../../models/Community";

// Import postman.
import { CommunitiesPostman } from "./communities.postman";
const postman: CommunitiesPostman = new CommunitiesPostman;

export class CommunitiesController {
    async get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
        try {
            const data: Community | Community[] = await postman.get(req);
            if (Array.isArray(data)) return res.status(200).json({ communities: data });
            res.status(200).json(data);
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

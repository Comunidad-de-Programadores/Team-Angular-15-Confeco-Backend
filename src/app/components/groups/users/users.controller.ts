// Imports modules.
import { Request, Response } from "express";

// Import postman.
import { GroupsUsersPostman } from "./users.postman";
const postman: GroupsUsersPostman = new GroupsUsersPostman;

export class GroupsUsersController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const { user, group } = await postman.create(req);
            res.status(200).json({ message: `${ user } se unio al grupo ${ group }` });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

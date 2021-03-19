// Imports modules.
import { Request, Response } from "express";

// Imports models.
import { Group } from "../../../models/Group";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
const database = new DatabaseRepository<Group>();

// Import repository actions.
import { ListGroupsByMemberId } from "../../../repositories/groups/read.groups";

export class UsersGroupsController {
    async list(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const groups: Group[] = await database.list(new ListGroupsByMemberId({ userId }));
            res.status(200).json({ groups });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

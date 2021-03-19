// Imports modules.
import { Request, Response } from "express";

// Imports models.
import { Group } from "../../models/Group";

// Imports repositories.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";
const database = new DatabaseRepository<Group>();

// Imports repository actions.
import { ListGroups } from "../../repositories/groups/read.groups";

export class GroupsController {
    async list(req: Request, res: Response): Promise<Response<string, Record<string, any>> | void> {
        try {
            const groups: Group[] = await database.list(new ListGroups);
            res.status(200).json({ groups });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}

// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { List } from "../interfaces/repository.interfaces";

// Imports models.
import { Group } from "../../models/Group";

export class ListGroups implements List<Group> {
    async list(): Promise<Group[]> {
        return await models.Group.find() as any[];
    }
}
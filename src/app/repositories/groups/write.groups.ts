// Imports database models.
import { models } from "../../database/mongo";

// Imports models.
import { Group } from "../../models/Group";

// Imports interfaces.
import { Create } from "../interfaces/repository.interfaces";

export class CreateGroup implements Create<Group> {
    async create(group: Group): Promise<void> {
        await models.Group.create(group);
    }
}

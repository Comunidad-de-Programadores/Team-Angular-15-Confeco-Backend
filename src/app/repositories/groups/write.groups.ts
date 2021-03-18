// Imports database models.
import { models } from "../../database/mongo";

// Imports models.
import { Group } from "../../models/Group";

// Imports interfaces.
import { Create, Update } from "../interfaces/repository.interfaces";
import { BasicUpdateParams } from "../interfaces/entities.interfaces";

export class CreateGroup implements Create<Group> {
    async create(group: Group): Promise<void> {
        await models.Group.create(group);
    }
}

export class AddMemberToGroup implements Update {
    constructor(private data: {groupId: string; userId: string}) {}

    async update() {
        const { groupId, userId } = this.data;
        await models.Group.updateOne({ _id: groupId }, { $push: { members: userId } });
    }
}

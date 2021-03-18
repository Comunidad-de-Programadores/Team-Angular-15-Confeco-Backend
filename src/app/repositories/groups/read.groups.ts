// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models.
import { Group } from "../../models/Group";

export class GetGroup implements Get<string, Group> {
    async get(groupId: string): Promise<Group | null> {
        return await models.Group.findById(groupId) as any;
    }
}

export class ListGroups implements List<Group> {
    async list(): Promise<Group[]> {
        return await models.Group.find() as any[];
    }
}

export class ListGroupsByMemberId implements List<Group> {
    constructor(private data: { userId: string }) {}

    async list(): Promise<Group[]> {
        return await models.Group.find(
            { members: this.data.userId },
            { members: 0 }
        ) as any[];
    }
}

export class GetGroupByIdAndMemberId implements Get<string, Group> {
    constructor(private data: { memberId: string }) {}

    async get(groupId: string): Promise<Group | null> {
        return await models.Group.findOne({
            $and: [
                { _id: groupId },
                { members: this.data.memberId }
            ]
        }) as any;
    }
}

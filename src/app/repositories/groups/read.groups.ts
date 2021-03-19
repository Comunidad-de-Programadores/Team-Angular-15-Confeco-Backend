// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Get, List } from "../interfaces/repository.interfaces";

// Imports models.
import { Group } from "../../models/Group";

export class GetGroup implements Get<Group> {
    constructor(private groupId: string) {}

    async get(): Promise<Group | null> {
        return await models.Group.findById(this.groupId) as any;
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

export class GetGroupByIdAndMemberId implements Get<Group> {
    constructor(private data: { memberId: string; groupId: string; }) {}

    async get(): Promise<Group | null> {
        return await models.Group.findOne({
            $and: [
                { _id: this.data.groupId },
                { members: this.data.memberId }
            ]
        }) as any;
    }
}

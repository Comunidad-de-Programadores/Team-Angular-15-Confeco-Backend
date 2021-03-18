// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";

// Imports models.
import { Group } from "../../../models/Group";

// Imports repositories.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { GetGroup, GetGroupByIdAndMemberId } from "../../../repositories/groups/read.groups";
import { AddMemberToGroup } from "../../../repositories/groups/write.groups";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";
import { GetUser } from "../../../repositories/user/read.user";

export class GroupsUsersPostman {
    private databaseGroup: DatabaseRepository<string, Group>;
    private databaseUser: DatabaseRepository<string, UserDatabase>;

    constructor() {
        this.databaseGroup = new DatabaseRepository;
        this.databaseUser = new DatabaseRepository;
    }

    async create(req: Request): Promise<{ user: string; group: string }> {
        const { groupId } = req.params;
        const { userId } = req.body;

        // We check if the group exists
        const group: Group | null = await this.databaseGroup.get(groupId, new GetGroup);
        if (!group) throw createHttpError(404, "El grupo no existe.", {
            name: "ResourceNotFound"
        });

        // we check if the user exists
        const user: UserDatabase | null = await this.databaseUser.get(userId, new GetUser);
        if (!user) throw createHttpError(404, "El usuario no existe.", {
            name: "ResourceNotFound"
        });

        const result: Group | null = await this.databaseGroup.get(
            groupId,
            new GetGroupByIdAndMemberId({ memberId: userId })
        );
        if (result) throw createHttpError(403, "El usuario ya pertenece al grupo", {
            name: "UserBelongGroup"
        });
        
        // Add the user to the group
        await this.databaseGroup.update(new AddMemberToGroup({ groupId, userId }));
        return { user: user.nickname, group: group.name };
    }
}

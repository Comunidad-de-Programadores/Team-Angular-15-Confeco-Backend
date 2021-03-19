// Imports models.
import { Request } from "express";
import createHttpError from "http-errors";

// Imports models.
import { Community } from "../../models/Community";

// Imports repositories.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";

// Import repository actions.
import { GetComunity, ListCommuties } from "../../repositories/communities/read.communities";

export class CommunitiesPostman {
    private database: DatabaseRepository<Community>;

    constructor() {
        this.database = new DatabaseRepository;
    }

    async get(req: Request): Promise<Community | Community[]> {
        const { communityId } = req.params;

        if (communityId) {
            const community: Community | null = await this.database.get(new GetComunity(communityId));
            if (!community) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "ResourceNotFound"
            });
            
            return community;
        }

        return await this.database.list(new ListCommuties);
    }
}

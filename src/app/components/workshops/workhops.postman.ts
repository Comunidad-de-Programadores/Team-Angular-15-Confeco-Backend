// Imports modules.
import createHttpError from "http-errors";
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports interfaces.
import { IWorkshopRepository } from "../../database/interfaces/repositories.interfaces";

// Imports repositories.
import { WorkshopRepositoryMongo } from "../../database/mongo/repositories/WorkshopRepositoryMongo";

// Imports jsonwebtoken.
import { JsonWebToken } from "../../helpers/jsonwebtokens/JsonWebToken";
import { JwtAccessToken } from "../../helpers/jsonwebtokens/strategies/AccessToken";
import { User } from "../../models/User";

export class WorkshopPostman {
    private repository: IWorkshopRepository;
    private jwt: JsonWebToken;

    constructor() {
        this.repository = new WorkshopRepositoryMongo;
        this.jwt = new JwtAccessToken;
    }

    async create(req: Request) {
        // Save in the database.
        const _id = uuid();

        // We get the token.
        const authorization = req.headers.authorization as string;
        const token: string = authorization.replace("Bearer ", "");

        // We obtain the user's information.
        const payload: User = this.jwt.verify(token, new JwtAccessToken);
        const instructor: string = payload._id;

        // Save user in the database.
        await this.repository.create({ _id, instructor, ...req.body });

        // Get data
        return await this.repository.get(_id);
    }

    async list(req: Request) {
        // Get one.
        if (req.params.id) {
            const workshop = await this.repository.get(req.params.id);
            
            if (!workshop) throw createHttpError(404, "El recurso solicitado no existe.", {
                name: "NotFount"
            });

            return workshop;
        }

        // Get list
        const { limit, skip } = req.query;
        return await this.repository.list({
            limit: Number(limit),
            skip: Number(skip)
        });
    }
};

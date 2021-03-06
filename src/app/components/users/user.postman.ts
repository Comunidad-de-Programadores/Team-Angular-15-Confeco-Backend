// Imports modules.
import createHttpError from "http-errors";
import { Request } from "express";

// Imports services
import { CloudService } from "../../services/CloudService";
import { CloudinaryService } from "../../services/modules/CloudinaryService";

// Imports models.
import { User } from "../../models/User";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../database/interfaces/repositories.interfaces";
import { IUserDatabase } from "../../database/interfaces/entities.interfaces";
import { ResUpload } from "../../services/interfaces/cloudservice.interfaces";

// Imports repositories.
import { UserRepositoryMongo } from "../../database/mongo/repositories/UserRepositoryMongo";

export class UserPostman {
    private repository: IDatabaseUserRepository;
    private cloud: CloudService;

    constructor() {
        this.repository = new UserRepositoryMongo;
        this.cloud = new CloudService(new CloudinaryService);
    }

    async update(req: Request) {
        const { user } = req.app.locals;

        const data: IUserDatabase | null = await this.repository.get(user._id);
        if (!data) throw createHttpError(403, "El recurso no existe.", {
            name: "ResourceDoesNotExist"
        });

        if (data._id !== user._id) throw createHttpError(401, "No tienes los permisos necesarios para realizar esta accion.", {
            name: "Unauthorized"
        });

        await this.repository.update(data._id, {
            nickname: req.body.nickname || data.nickname,
            country: req.body.country || data.country,
            gender: req.body.gender || data.gender,
            facebookLink: req.body.facebookLink || data.facebookLink,
            twitterLink: req.body.twitterLink || data.twitterLink,
            githubLink: req.body.githubLink || data.githubLink,
            linkedinLink: req.body.linkedinLink || data.linkedinLink
        });

        const values: IUserDatabase | null = await this.repository.get(data._id);
        if (!values) throw createHttpError(400, "Ha ocurrido un error durante la operacion.", {
            name: "BadRequest"
        });

        return new User(values);
    }

    async changeAvatar(req: Request) {
        const { avatar }: any = req.files;
        const { user } = req.app.locals;

        // Upload file to cloud.
        const data: ResUpload = await this.cloud.upload(avatar, "picture_profiles");

        // Update user.
        await this.repository.updateAvatar(user._id, data.url);

        return data;
    }

    async convertInstructor(req: Request) {
        const { user } = req.app.locals;
        const { biography, knowledgeArea } = req.body;

        // Verify existence user.
        const data: User | null = await this.repository.get(user._id);
        if (!data) throw createHttpError(401, "El usuario no existe.", {
            name: "UserNotFound"
        });

        // Update user.
        const instructor: object = { biography, knowledgeArea };
        await this.repository.convertInstructor(user._id, instructor);
        
        return instructor;
    }
}

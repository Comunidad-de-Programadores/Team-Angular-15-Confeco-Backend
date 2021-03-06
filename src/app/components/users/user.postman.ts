// Imports modules.
import { Request } from "express";
import createHttpError from "http-errors";

// Imports cloudservice
import { CloudService } from "../../services/CloudService";
import { CloudinaryService } from "../../services/modules/CloudinaryService";

// Imports interfaces.
import { IDatabaseUserRepository } from "../../database/interfaces/repositories.interfaces";
import { IUserDatabase } from "../../database/interfaces/entities.interfaces";

// Imports repositories.
import { UserRepositoryMongo } from "../../database/mongo/repositories/UserRepositoryMongo";
import { User } from "../../models/User";
import { ResUpload } from "../../services/interfaces/cloudservice.interfaces";

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
            _id: data._id,
            nickname: req.body.nickname || data.nickname,
            verified_email: data.verified_email,
            email: data.email,
            country: req.body.country || data.country,
            gender: req.body.gender || data.gender,
            facebookLink: req.body.facebookLink || data.facebookLink,
            twitterLink: req.body.twitterLink || data.twitterLink,
            githubLink: req.body.githubLink || data.githubLink,
            linkedinLink: req.body.linkedinLink || data.linkedinLink,
            password: data.password
        });

        const values: IUserDatabase | null = await this.repository.get(data._id);
        if (!values) throw createHttpError(400, "Ha ocurrido un error durante la operacion.", {
            name: "BadRequest"
        });

        return new User(values);
    }

    async changeAvatar(req: Request) {
        const { avatar }: any = req.files;
        const data: ResUpload = await this.cloud.upload(avatar, "picture_profiles");
    }
}

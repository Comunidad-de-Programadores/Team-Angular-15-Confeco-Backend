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

    async me(req: Request): Promise<User> {
        const { _id } = req.app.locals.user;

        const user: User | null = await this.repository.get(_id);

        if (!user) throw createHttpError(401, "El usuario no existe", {
            name: "UserNotFound"
        });

        return new User(user);
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
            country: req.body.country,
            gender: req.body.gender,
            biography: req.body.biography,
            birthday: req.body.birthday,
            knowledgeAreas: req.body.knowledgeAreas,
            facebookLink: req.body.facebookLink,
            twitterLink: req.body.twitterLink,
            githubLink: req.body.githubLink,
            linkedinLink: req.body.linkedinLink
        });

        const values: IUserDatabase | null = await this.repository.get(data._id);
        if (!values) throw createHttpError(400, "Ha ocurrido un error durante la operacion.", {
            name: "BadRequest"
        });

        return new User(values);
    }

    async changeAvatar(req: Request) {
        const { picture }: any = req.files;
        const { user } = req.app.locals;

        // Upload file to cloud.
        const data: ResUpload = await this.cloud.upload(picture, "picture_profiles");

        // Update user.
        await this.repository.updateAvatar(user._id, data.url);

        return data;
    }

    async changeBanner(req: Request) {
        const { picture }: any = req.files;
        const { userId } = req.params;

        const values = await this.repository.get(userId);
        if (!values) throw createHttpError(404, "No puedes modificar el banner por que el usuario no existe.", {
            name: "UserNotFound"
        });

        if (values._id !== userId) throw createHttpError(401, "No tienes los permisos necesarios para realizar esta accion.", {
            name: "Unauthorized"
        });

        // Upload banner.
        const file: ResUpload = await this.cloud.upload(picture, "cover_pictures");

        // Update user.
        await this.repository.updateBanner(userId, file.url);

        return file;
    }
}

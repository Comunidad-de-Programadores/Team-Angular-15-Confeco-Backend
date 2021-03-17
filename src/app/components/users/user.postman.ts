// Imports modules.
import createHttpError from "http-errors";
import { Request } from "express";
import { v4 as uuid } from "uuid";

// Imports environments.
import { environments } from "../../config/environments";

// Imports rules.
import { rules } from "../../config/rules";

// Imports services
import { CloudService } from "../../services/CloudService";
import { CloudinaryService } from "../../services/modules/CloudinaryService";

// Imports models.
import { User } from "../../models/User";
import { BadgeUser } from "../../models/badges/BadgeUser";

// Imports interfaces.
import { ResUpload } from "../../services/interfaces/cloudservice.interfaces";
import { UserDatabase, UserUpdateableParams } from "../../repositories/interfaces/entities.interfaces";

// Imports repositories.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";
import { GetUser } from "../../repositories/user/read.user";
import { UpdateUser, UpdateUserAvatar, UpdateUserBanner } from "../../repositories/user/write.user";
import { GetBadgeByIdAndUserId } from "../../repositories/badges/read.badges";
import { WinBadge } from "../../repositories/badges/write.badge";

export class UserPostman {
    private databaseBadge: DatabaseRepository<string, BadgeUser>;
    private database: DatabaseRepository<string, UserDatabase>;
    private cloud: CloudService;

    constructor() {
        this.cloud = new CloudService(new CloudinaryService);
        this.databaseBadge = new DatabaseRepository;
        this.database = new DatabaseRepository;
    }

    async me(req: Request): Promise<User> {
        const { _id } = req.app.locals.user;

        // Consult database.
        const user: UserDatabase | null = await this.database.get(_id, new GetUser);
        if (!user) throw createHttpError(401, "El usuario no existe", {
            name: "UserNotFound"
        });

        return new User(user);
    }

    async update(req: Request) {
        const { user } = req.app.locals;

        const data: UserDatabase | null = await this.database.get(user._id, new GetUser);
        if (!data) throw createHttpError(403, "El recurso no existe.", {
            name: "ResourceDoesNotExist"
        });

        if (data._id !== user._id) throw createHttpError(401, "No tienes los permisos necesarios para realizar esta accion.", {
            name: "Unauthorized"
        });

        let value: UserUpdateableParams = {
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
        };

        // Updated fields user.
        await this.database.update(new UpdateUser({ key: data._id, value }));

        const values: UserDatabase | null = await this.database.get(data._id, new GetUser);
        if (!values) throw createHttpError(400, "Ha ocurrido un error durante la operacion.", {
            name: "BadRequest"
        });

        // Check if you have already earned the badge.
        const badge: BadgeUser | null = await this.databaseBadge.get(
            environments.BADGE_SOCIAL_ID as string,
            new GetBadgeByIdAndUserId(user._id)
        );

        // Check if your profile is complete.
        const comprobate = Object.entries(value).find(item => {
            const result: string | boolean = rules.required(item[1].toString());
            return typeof result !== "boolean";
        });

        // Assign Badge
        if (!badge && !comprobate) this.databaseBadge.create(new BadgeUser({
            _id: uuid(),
            userId: user._id,
            badgeId: environments.BADGE_SOCIAL_ID as string
        }), new WinBadge);

        return new User(values);
    }

    async changeAvatar(req: Request) {
        const { picture }: any = req.files;
        const { user } = req.app.locals;

        // Upload file to cloud.
        const data: ResUpload = await this.cloud.upload(picture, "picture_profiles");

        // Update user.
        await this.database.update(new UpdateUserAvatar({
            key: user._id,
            value: data.url
        }));

        return data;
    }

    async changeBanner(req: Request) {
        const { picture }: any = req.files;
        const { userId } = req.params;

        const values: UserDatabase | null = await this.database.get(userId, new GetUser);
        if (!values) throw createHttpError(404, "No puedes modificar el banner por que el usuario no existe.", {
            name: "UserNotFound"
        });

        if (values._id !== userId) throw createHttpError(401, "No tienes los permisos necesarios para realizar esta accion.", {
            name: "Unauthorized"
        });

        // Upload banner.
        const file: ResUpload = await this.cloud.upload(picture, "cover_pictures");

        // Update user.
        await this.database.update(new UpdateUserBanner({
            key: userId,
            value: file.url
        }));

        return file;
    }
}

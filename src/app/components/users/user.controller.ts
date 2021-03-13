// Imports modules.
import { Request, Response } from "express";

// Imports interfaces.
import { ResUpload } from "../../services/interfaces/cloudservice.interfaces";

// Imports postman
import { UserPostman } from "./user.postman";
const postman: UserPostman = new UserPostman;

export class UserController {
    async me(req: Request, res: Response): Promise<void> {
        try {
            const user = await postman.me(req);
            res.status(200).json(user);
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async profile(req: Request, res: Response): Promise<void> {
        res.status(200).json({
            message: `Im ${ req.params.id } profile from controller.`
        });
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const user = await postman.update(req);
            res.status(200).json({
                message: `Los datos de ${ user.nickname } han sido actualizados con exito.`,
                user
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async changeAvatar(req: Request, res: Response): Promise<void> {
        try {
            const picture: ResUpload = await postman.changeAvatar(req);
            res.status(200).json({
                message: "Su foto de perfil ha sido actualizada con exito.",
                picture
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async changeBanner(req: Request, res: Response): Promise<void> {
        try {
            const picture: ResUpload = await postman.changeBanner(req);
            res.status(200).json({
                message: "La foto de portada ha sido actualizada con exito.",
                picture
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
};

// Imports modules.
import { Request, Response } from "express";

// Imports postman
import { UserPostman } from "./user.postman";
const postman: UserPostman = new UserPostman;

export class UserController {
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
            await postman.changeAvatar(req);
            res.status(200).json({
                message: "Actualizar el avatar."
            });
        } catch (error) {
            const { statusCode, name, message } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
};

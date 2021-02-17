// Imports modules.
import { Request, Response } from "express";

// Imports interfaces.
import { IAuthRes } from "../../interfaces/auth.interfaces";

// Imports postman
import { AuthPostmanComponent } from "./auth.postman";
const authPostman = new AuthPostmanComponent();

export class AuthControllerComponents {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { nickname } = req.body;
            await authPostman.register(req);
            res.status(200).json({ message: `¡Felicidades ${ nickname }! Te has registrado correctamente. Te hemos enviado un email de confirmacion para verificar que eres tu.` });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const data: IAuthRes = await authPostman.login(req);
            res.status(200).json(data);
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async verificationEmail(req: Request, res: Response): Promise<void> {
        try {
            const { user }: IAuthRes = await authPostman.verifyEmail(req);
            res.render("success/verifiedEmail", {
                nickname: user.nickname
            });
        } catch (error) {
            res.status(400).render("errors/tokenInvalid");
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            await authPostman.forgotPassword(req);
            res.status(200).json({ message: "Se ha enviado un email a tu cuenta de correco electronico para que puedas modificar tu contraseña." });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async showResetPassword(req: Request, res: Response): Promise<void> {
        res.render("pages/reset_password", {
            token: req.params.token
        });
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            await authPostman.resetPassword(req);
            res.render("success/resetPassword");
        } catch (error) {
            res.status(400).render("errors/resetPassword", {
                message: error.message
            });
        }
    }

    async google(req: Request, res: Response): Promise<void> {
        try {
            const data: IAuthRes = await authPostman.google(req);
            res.status(200).json(data);
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }
}
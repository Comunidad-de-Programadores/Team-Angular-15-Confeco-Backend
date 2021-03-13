// Imports modules.
import { Request, Response } from "express";

// Imports interfaces.
import { IAuthRes } from "../../facade/auth/interfaces/auth.interfaces";

// Imports facades.
import { AuthFacade } from "../../facade/auth/auth.facade";
const auth = new AuthFacade();

export class AuthControllerComponents {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { nickname } = req.body;
            await auth.register(req.body);
            res.status(200).json({ message: `¡Felicidades ${ nickname }! Te has registrado correctamente. Te hemos enviado un email de confirmacion para verificar que eres tu.` });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const data: IAuthRes = await auth.login(req.body);
            res.status(200).json(data);
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async verificationEmail(req: Request, res: Response): Promise<void> {
        try {
            const { user }: IAuthRes = await auth.verifyEmail(req.params.token);
            res.render("success/verifiedEmail", {
                nickname: user.nickname
            });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            await auth.forgotPassword(req.body.email);
            res.status(200).json({ message: "Se ha enviado un email a tu cuenta de correo electronico para que puedas modificar tu contraseña." });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async showResetPassword(req: Request, res: Response): Promise<void> {
        try {
            await auth.checkValidityToken(req.params.token);
            res.render("pages/reset_password", {
                token: req.params.token,
                message: req.flash("message")
            });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            await auth.resetPassword(req.body);
            res.render("success/resetPassword");
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async google(req: Request, res: Response): Promise<void> {
        try {
            const data: IAuthRes = await auth.google(req.body.token);
            res.status(200).json(data);
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async facebook(req: Request, res: Response): Promise<void> {
        try {
            const data = await auth.facebook(req.body.token);
            res.status(200).json(data);
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async requestEmailChange(req: Request, res: Response): Promise<void> {
        try {
            const data = await auth.emailChangeRequest(req.app.locals.user);
            res.status(200).json({
                message: `${ data.nickname } se te ha enviado un link a tu correo electronico para que puedas modificar tu cuenta.`
            });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async showChangeEmail(req: Request, res: Response): Promise<void> {
        try {
            await auth.checkEmailResetToken(req.params.token);
            res.render("pages/reset_email", {
                token: req.params.token,
                message: req.flash("message")
            });
        } catch (error) {
            const { name, message, statusCode } = error;
            res.status(statusCode || 400).json({ name, message });
        }
    }

    async resetEmail(req: Request, res: Response): Promise<void> {
        res.json({ message: "Email modificado" });
    }
}
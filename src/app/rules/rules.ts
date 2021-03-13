// Imports modules.
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// Imports environments.
import { environments } from "../config/environments";

// Imports my rules.
import { rules } from "../config/rules";

export const email = body("email").isEmail().withMessage("El email es invalido");

export const nickname = body("nickname").custom(value => {
    const result: string | boolean = rules.nickname(value);
    if (typeof result === "string") throw new Error(result);
    return result;
});

export const password = body("password").custom(value => {
    const result: string | boolean = rules.password(value);
    if (typeof result === "string") throw new Error(result);
    return result;
});

export const uploadImage = body("picture").custom((value, data) => {
    const files = data.req.files;
    
    if (!files) throw new Error("Necesitas enviar una imagen.");

    if (Array.isArray(files.picture)) throw new Error("Solo puedes enviar una imagen, no una lista.");

    const result: string | boolean = rules.image(files.picture.mimetype);
    if (typeof result === "string") throw new Error(result);
    return result;
});

export function checkFieldsResetPassword(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { token, password } = req.body;

    const verifyToken: boolean | string = rules.required(token);
    if (typeof verifyToken === "string") {
        return res.status(400).json({
            message: "Necesitas proveer un token, para realizar esta accion."
        });
    }

    const verifyPwd: boolean | string = rules.password(password);
    if (typeof verifyPwd === "string") {
        req.flash("message", verifyPwd);
        return res.redirect(`${ environments.URL }/v1/auth/password/reset/${ token }`);
    }

    return next();
}

export function conditionRequestRules (
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const errors = validationResult(req);
    const error = errors.array({ onlyFirstError: true })[0];
    
    errors.isEmpty() ? next() : res.status(400).json({
        name: "InvalidData",
        message: error.msg
    });
};

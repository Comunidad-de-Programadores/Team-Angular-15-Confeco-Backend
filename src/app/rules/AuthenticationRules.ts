// Imports modules.
import { NextFunction, Request, Response } from "express";

// Imports interfaces.
import { IRuleError } from "../interfaces/rules.interfaces";

// Imports validators
import { ValidateFields } from "../helpers/ValidateFields";

// Imports rules.
import { rules } from "../config/rules";

export class AuthenticationRules {
    checkFieldsBeforeRegistration(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const { nickname, email, password } = req.body;

        const errors: IRuleError[] = new ValidateFields([
            {
                field: "nickname",
                value: nickname,
                types: [rules.required, rules.nickname]
            },
            {
                field: "email",
                value: email,
                types: [rules.required, rules.email]
            },
            {
                field: "password",
                value: password,
                types: [rules.required, rules.password]
            }
        ]).validate();

        !errors.length ? next() : res.status(400).json(errors);
    }

    checkFieldsBeforeLogin(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const { email, password } = req.body;

        const errors: IRuleError[] = new ValidateFields([
            {
                field: "email",
                value: email,
                types: [rules.required, rules.email]
            },
            {
                field: "password",
                value: password,
                types: [rules.required, rules.password]
            }
        ]).validate();

        !errors.length ? next() : res.status(400).json(errors);
    }

    checkFieldsSendPwdPasswordReset(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        const errors: IRuleError[] = new ValidateFields([{
            field: "email",
            value: req.body.email,
            types: [rules.required, rules.email]
        }]).validate();

        !errors.length ? next() : res.status(400).json(errors);
    }

    checkFieldsBeforePasswordReset(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { token, password } = req.body;

        const verifyToken: boolean | string = rules.required(token);
        if (typeof verifyToken === "string") {
            return res.status(400).json({
                message: "Necesitas proveer un token, para poder continuar."
            });
        }

        const verifyPwd: boolean | string = rules.password(password);
        if (typeof verifyPwd === "string") {
            req.flash("message", verifyPwd);
            return res.redirect(`/api/auth/password/reset/${ token }`);
        }

        return next();
    }
};

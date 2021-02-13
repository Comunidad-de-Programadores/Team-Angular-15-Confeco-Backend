// Imports modules.
import { NextFunction, Request, Response } from "express";

// Imports interfaces.
import { IRuleError } from "../interfaces/rules.interfaces";

// Imports validators
import { ValidateFields } from "../helpers/ValidateFields";

// Imports rules.
import { rules } from "../config/rules";

export class AuthenticationRules {
    checkFieldsBeforeRegistration(req: Request, res: Response, next: NextFunction) {
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
};

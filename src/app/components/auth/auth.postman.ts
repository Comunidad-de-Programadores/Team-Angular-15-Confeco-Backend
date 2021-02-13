// Imports modules.
import { Request } from "express";

// Imports facades
import { AuthFacade } from "../../facade/auth/auth.facade";
import { IAuthRes } from "../../interfaces/auth.interfaces";

export class AuthPostmanComponent {
    private auth: AuthFacade;

    constructor() {
        this.auth = new AuthFacade();
    }

    async register(req: Request): Promise<IAuthRes> {
        return await this.auth.register(req.body);
    }

    async login(req: Request): Promise<IAuthRes> {
        return await this.auth.login(req.body);
    }

    async google(req: Request): Promise<IAuthRes> {
        const { token } = req.body;
        return await this.auth.google(token);
    }
};

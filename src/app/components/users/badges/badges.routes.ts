// Imports modules.
import { Router } from "express";

// Imports middlewares.
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { BadgesUsersController } from "./badges.controller";
const badges: BadgesUsersController = new BadgesUsersController;

export class BadgesUsersRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/", [auth.isAuth], badges.list);
    }
}

// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports middlewares
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { BadgesController } from "./badges.controller";
const badges: BadgesController = new BadgesController;

export class BadgesRoutes {
    constructor(public router: Router) {
        this.get();
    }

    private get(): void {
        this.router.get("/:badgeId?", [auth.isAuth], badges.get);
    }
}

export const badgesRoutes: IRouter = {
    path: "/api/v1/badges",
    component: new BadgesRoutes(Router()).router
}

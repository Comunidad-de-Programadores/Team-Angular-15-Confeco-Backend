// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { CommunitiesController } from "./communities.controller";
const communities: CommunitiesController = new CommunitiesController;

export class CommunitiesRoutes {
    constructor(public router: Router) {
        this.get();
    }

    private get(): void {
        this.router.get("/:communityId?", [auth.isAuth], communities.get);
    }
}

export const communitiesRoutes: IRouter = {
    path: "/api/v1/communities",
    component: new CommunitiesRoutes(Router()).router
}

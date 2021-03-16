// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { ComunitiesController } from "./comunities.controller";
const comunities: ComunitiesController = new ComunitiesController;

export class ComunitiesRoutes {
    constructor(public router: Router) {
        this.get();
    }

    private get(): void {
        this.router.get("/:comunityId?", [auth.isAuth], comunities.get);
    }
}

export const comunitiesRoutes: IRouter = {
    path: "/api/v1/comunities",
    component: new ComunitiesRoutes(Router()).router
}

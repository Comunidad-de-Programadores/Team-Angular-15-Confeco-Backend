// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { ContentCreatorsController } from "./contentCreators.controller";
const creatorContent: ContentCreatorsController = new ContentCreatorsController;

export class ContentCreatorsRoutes {
    constructor(public router: Router) {
        this.get();
    }

    private get(): void {
        this.router.get("/:creatorId?", [auth.isAuth], creatorContent.get);
    }
}

export const contentCreators: IRouter = {
    path: "/api/v1/contentCreators",
    component: new ContentCreatorsRoutes(Router()).router
}

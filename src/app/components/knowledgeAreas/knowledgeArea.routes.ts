// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Import child routes.
import { KnowledgeAreaWorkshopsRoutes } from "./workshops/workshops.routes";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { KnowledgeAreaController } from "./knowledgeArea.controller";
const controller: KnowledgeAreaController = new KnowledgeAreaController;

export class KnowledgeAreaRoutes {
    constructor(public router: Router) {
        this.get();
    }

    private get(): void {
        this.router.get("/:id?", [auth.isAuth], controller.get);
    }
}

export const knowlegAreaRoutes: IRouter = {
    path: "/api/v1/knowledgeAreas",
    component: new KnowledgeAreaRoutes(Router()).router,
    children: [
        {
            path: "/:knowledgeAreaId/workshops",
            component: new KnowledgeAreaWorkshopsRoutes(Router({ mergeParams: true })).router
        }
    ]
};

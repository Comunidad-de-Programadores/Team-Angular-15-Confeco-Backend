// Imports modules.
import { Router } from "express";

// Imports auth middlewares.
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controller.
import { KnowledgeAreaWorkshopController } from "./workshop.controller";
const controller: KnowledgeAreaWorkshopController = new KnowledgeAreaWorkshopController;

export class KnowledgeAreaWorkshopRoutes {
    constructor(public router: Router) {
        this.get();
    }

    private get(): void {
        this.router.get("/:workshopId?", [auth.isAuth], controller.get);
    }
};

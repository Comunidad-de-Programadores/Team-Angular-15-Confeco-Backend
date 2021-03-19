// Import modules.
import { Router } from "express";

// Imports middlewares.
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Import controller.
import { KnowledgeAreaWorkshopsController } from "./workshops.controller";
const controller: KnowledgeAreaWorkshopsController = new KnowledgeAreaWorkshopsController;

export class KnowledgeAreaWorkshopsRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/", [auth.isAuth], controller.list);
    }
}
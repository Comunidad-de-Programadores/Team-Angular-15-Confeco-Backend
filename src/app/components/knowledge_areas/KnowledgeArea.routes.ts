// Imports modules.
import { Router } from "express";
import { IRoute } from "../../routes/interfaces/routes.interfaces";

// Imports controller.
import { KnowledgeAreaController } from "./KnowledgeArea.controller";
const controller: KnowledgeAreaController = new KnowledgeAreaController();

export class KnowledgeAreaRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/:id?", controller.list);
    }
};

export const knowledgeRoutes: IRoute = {
    path: "/api/v1/knowledge_areas",
    component: new KnowledgeAreaRoutes(Router()).router
};

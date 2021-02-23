// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports child routes.
import { KnowledgeAreaWorkshopRoutes } from "./workshops/KnowledgeAreaWorkshops.routes";

// Imports controller.
import { KnowledgeAreaController } from "./KnowledgeArea.controller";
const controller: KnowledgeAreaController = new KnowledgeAreaController();

export class KnowledgeAreaRoutes {
    constructor(public router: Router) {
        this.create();
        this.list();
    }

    private create(): void {
        this.router.post("/", controller.create);
    }

    private list(): void {
        this.router.get("/:id?", controller.list);
    }
};

export const knowledgeRoutes: IRouter = {
    path: "/api/v1/knowledge_areas",
    component: new KnowledgeAreaRoutes(Router()).router,
    children: [
        {
            path: "/:id/workshops",
            component: new KnowledgeAreaWorkshopRoutes(Router({ mergeParams: true })).router
        }
    ]
};

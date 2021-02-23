// Imports modules.
import { Router } from "express";

// Imports controllers.
import { KnowledgeAreaWorkshopController } from "./KnowledgeAreaWorkshop.controller";
const controller = new KnowledgeAreaWorkshopController();

export class KnowledgeAreaWorkshopRoutes {
    constructor(public router: Router) {
        this.get();
    }

    private get(): void {
        this.router.get("/:workshop_id?", controller.get);
    }
};

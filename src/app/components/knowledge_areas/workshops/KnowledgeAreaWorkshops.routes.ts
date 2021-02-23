// Imports modules.
import { Router } from "express";

// Imports controllers.
import { KnowledgeAreaWorkshopController } from "./KnowledgeAreaWorkshop.controller";
const controller = new KnowledgeAreaWorkshopController();

export class KnowledgeAreaWorkshopRoutes {
    constructor(public router: Router) {
        this.create();
        this.get();
    }

    private create(): void {
        this.router.post("/", controller.create);
    }

    private get(): void {
        this.router.get("/:workshop_id?", controller.get);
    }
};

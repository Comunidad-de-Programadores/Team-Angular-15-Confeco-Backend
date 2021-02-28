// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports controllers.
import { ComunitiesController } from "./comunities.controller";
const comunities: ComunitiesController = new ComunitiesController;

export class ComunitiesRoutes {
    constructor(public router: Router) {
        this.create();
    }

    private create(): void {
        this.router.post("/", comunities.create);
    }
}

export const comunitiesRoutes: IRouter = {
    path: "/api/v1/comunities",
    component: new ComunitiesRoutes(Router()).router
}

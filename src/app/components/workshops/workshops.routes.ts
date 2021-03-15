// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controller.
import { WorkshopsController } from "./workshops.controlles";
const workshops: WorkshopsController = new WorkshopsController;

export class WorkshopRoutes {
    constructor(public router: Router) {
        this.get();
    }

    private get(): void {
        this.router.get("/:id?", [auth.isAuth], workshops.get);
    }
}

export const workshopsRoutes: IRouter = {
    path: "/api/v1/workshops",
    component: new WorkshopRoutes(Router()).router
};

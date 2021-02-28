// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports auth middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { EventsController } from "./events.controller";
const controller: EventsController = new EventsController;

export class EventsRoutes {
    constructor(public router: Router) {
        this.create();
    }

    private create(): void {
        this.router.post("/", [auth.isAuth], controller.create);
    }
}

export const eventsRoutes: IRouter = {
    path: "/api/v1/events",
    component: new EventsRoutes(Router()).router
}

// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Import controller.
import { EventsController } from "./events.controller";
const events: EventsController = new EventsController;

export class EventsRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/", [auth.isAuth], events.list);
    }
}

export const eventsRoutes: IRouter = {
    path: "/api/v1/events",
    component: new EventsRoutes(Router()).router
}

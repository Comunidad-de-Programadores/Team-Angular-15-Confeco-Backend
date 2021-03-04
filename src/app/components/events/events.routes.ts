// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports auth middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { EventsController } from "./events.controller";
const event: EventsController = new EventsController;

export class EventsRoutes {
    constructor(public router: Router) {
        this.create();
        this.get();
    }

    private create(): void {
        this.router.post("/", [auth.isAuth], event.create);
    }

    private get(): void {
        this.router.get("/:id?", [auth.isAuth], event.get);
    }
}

export const eventsRoutes: IRouter = {
    path: "/api/v1/events",
    component: new EventsRoutes(Router()).router
}

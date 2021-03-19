// Imports modules.
import { Router } from "express";

// Import middleware.
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Import controller.
import { EventsUserController } from "./users.controller";
const controller: EventsUserController = new EventsUserController;

export class EventsUsersRoutes {
    constructor(public router: Router) {
        this.create();
        this.remove();
    }

    private create(): void {
        this.router.post("/", [auth.isAuth], controller.create);
    }

    private remove(): void {
        this.router.delete("/:userId", [auth.isAuth], controller.remove);
    }
}

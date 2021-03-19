// Imports modules.
import { Router } from "express";

// Import middleware
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Import controller.
import { UsersEventsController } from "./events.controller";
const controller: UsersEventsController = new UsersEventsController;

export class UsersEventsRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/", [auth.isAuth], controller.list);
    }
}

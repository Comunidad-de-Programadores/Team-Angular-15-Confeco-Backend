// Imports modules.
import { Router } from "express";

// Imports controllers.
import { EventUserController } from "./users.controller";
const controller: EventUserController = new EventUserController;

// Imports middlewares.
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

export class EventUserRoutes {
    constructor(public router: Router) {
        this.create();
        this.get();
        this.remove();
    }

    private create(): void {
        this.router.post("/", [auth.isAuth], controller.create);
    }

    private get(): void {
        this.router.get("/:userId?", [auth.isAuth], controller.get);
    }

    private remove(): void {
        this.router.delete("/:userId", [auth.isAuth], controller.remove);
    }
}

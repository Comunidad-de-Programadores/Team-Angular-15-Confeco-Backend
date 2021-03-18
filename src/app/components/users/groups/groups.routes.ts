// Imports modules.
import { Router } from "express";

// Imports middlewares.
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Import controller.
import { UsersGroupsController } from "./groups.controller";
const controller: UsersGroupsController = new UsersGroupsController;

export class UsersGroupsRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/", [auth.isAuth], controller.list);
    }
}

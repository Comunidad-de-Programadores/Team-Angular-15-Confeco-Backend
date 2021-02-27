// Imports modules.
import { Router } from "express";

// Imports auth middlewares.
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers
import { UserWorkshopController } from "./workshop.controller";
const controller: UserWorkshopController = new UserWorkshopController;

export class UserWorkshopRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/:workshopId?", [auth.isAuth], controller.list);
    }
};

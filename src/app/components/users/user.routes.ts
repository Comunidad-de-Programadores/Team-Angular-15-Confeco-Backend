// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports controllers.
import { UserController } from "./user.controller";
const controller = new UserController;

export class UserRoutes {
    constructor(public router: Router) {
        this.profile();
    }

    private profile(): void {
        this.router.get("/:id/profile", controller.profile);
    }
};

export const userRoutes: IRouter = {
    path: "/api/v1/users",
    component: new UserRoutes(Router()).router
};

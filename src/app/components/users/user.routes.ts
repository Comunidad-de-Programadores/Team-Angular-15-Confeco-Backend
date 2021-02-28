// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports children routes.
import { UserWorkshopRoutes } from "./workshops/workshop.routes";

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
    component: new UserRoutes(Router()).router,
    children: [
        {
            path: "/:userId/workshops",
            component: new UserWorkshopRoutes(Router({ mergeParams: true })).router
        }
    ]
};
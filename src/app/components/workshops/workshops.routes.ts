// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports auth middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports roles middleware.
import { RolesMiddleware } from "../../middlewares/roles.middleware";
const roles: RolesMiddleware = new RolesMiddleware;

// Imports controllers
import { WorkshopsControllerComponent } from "./workshops.controller";
const workshop: WorkshopsControllerComponent = new WorkshopsControllerComponent;

export class WorkshopsRoutesComponent {
    constructor(public router: Router) {
        this.create();
        this.list();
        this.remove();
    }

    private create(): void {
        this.router.post("/", [auth.isAuth], workshop.create);
    }

    private list(): void {
        this.router.get("/:id?", workshop.list);
    }

    private remove(): void {
        this.router.delete("/:id", [auth.isAuth], workshop.remove);
    }
};

export const workshopsRoutes: IRouter = {
    path: "/api/v1/workshops",
    component: new WorkshopsRoutesComponent(Router()).router
};

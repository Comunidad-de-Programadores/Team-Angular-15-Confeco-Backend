// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth = new AuthMiddleware;

// Imports controllers
import { WorkshopsControllerComponent } from "./workshops.controller";
const workshops = new WorkshopsControllerComponent;

export class WorkshopsRoutesComponent {
    constructor(public router: Router) {
        this.create();
        this.list();
    }

    private create(): void {
        this.router.post("/", [auth.isAuth], workshops.create);
    }

    private list(): void {
        this.router.get("/:id?", workshops.list);
    }
};

export const workshopsRoutes: IRouter = {
    path: "/api/v1/workshops",
    component: new WorkshopsRoutesComponent(Router()).router
};

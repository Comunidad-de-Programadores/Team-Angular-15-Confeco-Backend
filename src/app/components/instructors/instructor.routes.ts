// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRoute } from "../../routes/interfaces/routes.interfaces";

// Imports controller.
import { InstructorController } from "./instructor.controller";
const controller = new InstructorController;

export class InstructorRoutes {
    constructor(public router: Router) {
        this.create();
        this.list();
        this.myWorkshops();
    }

    private create(): void {
        this.router.post("/", controller.create);
    }

    private list(): void {
        this.router.get("/:id?", controller.list);
    }

    private myWorkshops(): void {
        this.router.get("/:user_id/workshops/:id?", controller.myWorkshops);
    }
};

export const instructorRoutes: IRoute = {
    path: "/api/v1/instructors",
    component: new InstructorRoutes(Router()).router
};

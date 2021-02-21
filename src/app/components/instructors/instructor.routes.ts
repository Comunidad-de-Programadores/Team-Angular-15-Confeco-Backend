// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRoute } from "../../routes/interfaces/routes.interfaces";

// Imports controller.
import { InstructorController } from "./instructor.controller";
const controller = new InstructorController;

export class InstructorRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/:id?", controller.list);
    }
};

export const instructorRoutes: IRoute = {
    path: "/api/v1/instructors",
    component: new InstructorRoutes(Router()).router
};

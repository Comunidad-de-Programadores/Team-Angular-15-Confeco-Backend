// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRoute } from "../../routes/interfaces/routes.interfaces";

// Imports controllers
import { WorkshopsControllerComponent } from "./workshops.controller";
const workshops = new WorkshopsControllerComponent;

export class WorkshopsRoutesComponent {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/", workshops.list);
    }
};

export const workshopsRoutes: IRoute = {
    path: "/api/v1/workshops",
    component: new WorkshopsRoutesComponent(Router()).router
};

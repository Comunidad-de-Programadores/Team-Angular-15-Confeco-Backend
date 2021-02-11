// Imports modules.
import { Express, Router } from "express";

// Server routes.
import { AuthRoutesComponent } from "../components/auth/auth.routes";

const routes: Router[] = [
    // Components routes...
    new AuthRoutesComponent(Router()).router
];

export class IndexRoutes {
    constructor(public main: Express) {
        routes.forEach(route => this.main.use("/api", route));
    }
}
